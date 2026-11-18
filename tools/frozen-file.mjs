#!/usr/bin/env node
/*
 * Kerckhoffs — fabriquer la version figée.  /  Build the frozen single-file version.
 *
 *   node tools/frozen-file.mjs
 *
 * Produit download/kerckhoffs-<version>.html : toute l'application dans un seul fichier,
 * qui s'ouvre d'un double-clic, sans internet, et ne se met JAMAIS à jour tout seul.
 * Pour les usages sensibles : ce que vous avez vérifié une fois reste exactement ce que vous utilisez.
 *
 * Le code de Kerckhoffs y est recopié en clair, lisible tel quel. Seuls les moteurs déjà compilés
 * (lecture du texte, lecture des PDF) y sont rangés en base64, et décodés sur l'appareil.
 * Le fichier se signe ensuite comme le reste : node tools/sign.mjs /chemin/vers/cle-privee.pem
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { version } from "./checksums.mjs";

const racine = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const lire = (f) => fs.readFileSync(path.join(racine, f));
const texte = (f) => {
  const t = lire(f).toString("utf8");
  if (/<\/script|<!--/i.test(t)) throw new Error(`${f} cannot be copied as is into a page`);
  return t;
};
const v = version(racine);
let html = lire("index.html").toString("utf8");
if (!html.includes(`href="download/kerckhoffs-${v}.html"`)) throw new Error(`The link in index.html must point to download/kerckhoffs-${v}.html`);

// 1. Le verrou : rien ne peut sortir. connect-src n'autorise que les données déjà dans le fichier (blob:).
const CSP = "default-src 'none'; script-src 'unsafe-inline' blob: 'wasm-unsafe-eval'; style-src 'unsafe-inline'; " +
  "img-src blob: data:; media-src blob:; connect-src blob: data:; worker-src blob:; font-src data:; " +
  "object-src 'none'; base-uri 'none'; form-action 'none'";
html = html.replace(/<meta http-equiv="Content-Security-Policy" content="[^"]*">/, `<meta http-equiv="Content-Security-Policy" content="${CSP}">`);

// 2. Feuille de style et icônes à l'intérieur du fichier.
const svg = "data:image/svg+xml;base64," + lire("icons/icon.svg").toString("base64");
html = html.replace('<link rel="manifest" href="manifest.webmanifest">\n', "")
  .replace('<link rel="apple-touch-icon" href="icons/icon-180.png">\n', "")
  .replace('href="icons/icon.svg"', `href="${svg}"`)
  .replace(/src="icons\/icon\.svg"/g, `src="${svg}"`)
  .replace('<link rel="stylesheet" href="app.css">', `<style>\n${texte("app.css")}\n</style>`);

// 3. Les moteurs compilés, rangés en base64 (ils ne s'exécutent pas tant qu'on ne les décode pas).
const donnees = {
  "k-pdf-lib": "vendor/pdfjs/pdf.min.js",
  "k-pdf-worker": "vendor/pdfjs/pdf.worker.min.js",
  "k-pdf-openjpeg": "vendor/pdfjs/wasm/openjpeg.wasm",
  "k-pdf-jbig2": "vendor/pdfjs/wasm/jbig2.wasm",
  "k-pdf-qcms": "vendor/pdfjs/wasm/qcms_bg.wasm",
  "k-ocr-worker": "vendor/tesseract/worker.min.js",
  "k-ocr-core": "vendor/tesseract/core/tesseract-core-simd-lstm.wasm.js",
  "k-ocr-fra": "vendor/tesseract/lang/fra.traineddata.gz",
};
const blocs = Object.entries(donnees).map(([id, f]) =>
  `<script type="application/octet-stream" id="${id}" data-fichier="${f}">${lire(f).toString("base64")}</script>`).join("\n");

// Décode les moteurs en fichiers locaux (blob:), et apprend au moteur de lecture à les trouver là.
const amorce = `<script>
/* Kerckhoffs, version figée ${v} : les moteurs inclus dans ce fichier sont décodés ici, sur l'appareil. */
(function () {
  const brut = (id) => Uint8Array.from(atob(document.getElementById(id).textContent), (c) => c.charCodeAt(0));
  const url = (id, type) => URL.createObjectURL(new Blob([brut(id)], { type }));
  // Le moteur de lecture reçoit tout en un seul bloc : son noyau, la langue française, puis lui-même.
  // Ainsi il n'a rien à charger : il ne demande « fige/... » que par habitude, et reçoit ce qui est déjà là.
  const relais = "const __fra=Uint8Array.from(atob(" + JSON.stringify(document.getElementById("k-ocr-fra").textContent) + "),(c)=>c.charCodeAt(0));" +
    "self.importScripts=(...u)=>{if(!u.every((x)=>/tesseract-core/.test(x)))throw new Error('blocked');};" +
    "self.fetch=(u)=>/fra\\\\.traineddata/.test(String(u))?Promise.resolve(new Response(__fra)):Promise.reject(new Error('blocked'));\\n";
  window.KerckhoffsFige = {
    version: ${JSON.stringify(v)},
    // PDF.js est un module : la bibliothèque et son assistant deviennent des fichiers locaux (blob:), importés au premier PDF.
    pdfLib: url("k-pdf-lib", "text/javascript"),
    // Son assistant tourne dans un « worker » classique : un fichier ouvert d'un double-clic ne peut pas lancer de worker module.
    // Deux retouches seulement, le reste est le fichier d'origine tel quel : la dernière ligne (« export ») est retirée, et
    // « import.meta.url » (adresse du fichier, que les décodeurs notent sans s'en servir ici) devient l'adresse du worker.
    pdfWorker: URL.createObjectURL(new Blob([new TextDecoder().decode(brut("k-pdf-worker"))
      .replace(/export\s*\{\s*WorkerMessageHandler\s*\};?\s*$/, "").replace(/import\.meta\.url/g, "self.location.href")], { type: "text/javascript" })),
    // Ses décodeurs d'images, remis à la demande, sans rien aller chercher.
    pdfWasm: {
      "openjpeg.wasm": () => brut("k-pdf-openjpeg"),
      "jbig2.wasm": () => brut("k-pdf-jbig2"),
      "qcms_bg.wasm": () => brut("k-pdf-qcms"),
    },
    ocrWorker: URL.createObjectURL(new Blob([relais, brut("k-ocr-core"), "\\n", brut("k-ocr-worker")], { type: "text/javascript" })),
  };
})();
</script>`;

// 4. Le code, en clair, dans le même ordre que la page officielle.
// Les moteurs et l'amorce passent avant le premier script.
let premier = true;
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, f) => {
  const s = `<script>\n/* ---- ${f} ---- */\n${texte(f)}\n</script>`;
  if (!premier) return s;
  premier = false;
  return `${blocs}\n${amorce}\n${s}`;
});
if (premier) throw new Error("No script found in index.html");
// Contrôle : en dehors du code recopié, aucune balise ne doit pointer vers un autre fichier.
const balises = html.replace(/(<script[^>]*>)[\s\S]*?<\/script>/g, "$1</script>");
const reste = balises.match(/<script src=[^>]*>|<link [^>]*href="(?!data:)[^>]*>|<img [^>]*src="(?!data:)[^>]*>/);
if (reste) throw new Error("A reference to an external file is left in the page: " + reste[0]);

fs.mkdirSync(path.join(racine, "download"), { recursive: true });
// Une seule version figée à la fois dans le dossier : les anciennes restent dans l'historique du dépôt.
for (const f of fs.readdirSync(path.join(racine, "download"))) fs.unlinkSync(path.join(racine, "download", f));
const sortie = `download/kerckhoffs-${v}.html`;
fs.writeFileSync(path.join(racine, sortie), html);
console.log(`${sortie} : ${(html.length / 1e6).toFixed(1)} Mo`);
