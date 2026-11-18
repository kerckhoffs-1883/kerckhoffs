#!/usr/bin/env node
/*
 * Kerckhoffs — préparer puis finaliser une version, sans jamais toucher au sceau.
 *
 *   node tools/version.mjs preparer
 *       Fabrique la version figée et checksums.txt, et dit quels fichiers l'auteur doit signer
 *       (dans la page du sceau, onglet « Signer »).
 *
 *   node tools/version.mjs finaliser
 *       Range les signatures reçues (fichiers .sig), les vérifie avec public-key.pem,
 *       et ajoute la ligne de la version dans VERSIONS.md.
 *
 * Le sceau reste chez l'auteur : ici, on ne manipule que des fichiers publics.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { texteEmpreintes, empreinteCourte, version, sha256 } from "./checksums.mjs";

const racine = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (f) => path.join(racine, f);
const v = version(racine);
const fige = `download/kerckhoffs-${v}.html`;
const aSigner = ["checksums.txt", fige, "brand/logo-guide.html"];

if (process.argv[2] === "preparer") {
  execFileSync(process.execPath, [p("tools/frozen-file.mjs")], { stdio: "inherit" });
  fs.writeFileSync(p("checksums.txt"), texteEmpreintes(racine));
  for (const f of ["checksums.sig", fige + ".sig"]) if (fs.existsSync(p(f))) fs.unlinkSync(p(f));
  console.log(`\nVersion ${v} prête. Numéro de référence : ${empreinteCourte(fs.readFileSync(p("checksums.txt"), "utf8"))}`);
  console.log("À signer par l'auteur :\n" + aSigner.map((f) => "  " + f).join("\n"));
} else if (process.argv[2] === "finaliser") {
  // La page du sceau nomme la signature « fichier.sig » : on range chacune à sa place.
  const recues = process.argv[3] ? path.resolve(process.argv[3]) : racine;
  const place = { "checksums.txt.sig": "checksums.sig", [path.basename(fige) + ".sig"]: fige + ".sig", "logo-guide.html.sig": "brand/logo-guide.html.sig" };
  for (const [nom, dest] of Object.entries(place)) if (fs.existsSync(path.join(recues, nom)) && path.join(recues, nom) !== p(dest)) fs.copyFileSync(path.join(recues, nom), p(dest));
  const cle = crypto.createPublicKey(fs.readFileSync(p("public-key.pem")));
  let ok = true;
  for (const [f, sig] of [["checksums.txt", "checksums.sig"], [fige, fige + ".sig"], ["brand/logo-guide.html", "brand/logo-guide.html.sig"]]) {
    const bon = fs.existsSync(p(sig)) && crypto.verify(null, fs.readFileSync(p(f)), cle, fs.readFileSync(p(sig)));
    console.log(`${bon ? "✓" : "✗"} ${f}`); if (!bon) ok = false;
  }
  if (!ok) { console.log("\nUne signature manque ou ne correspond pas : rien n'a été publié."); process.exit(1); }
  const texte = fs.readFileSync(p("checksums.txt"), "utf8");
  const vf = p("VERSIONS.md");
  const lignes = fs.readFileSync(vf, "utf8").split("\n").filter((l) => !l.startsWith(`| ${v} |`));
  lignes.splice(lignes.findIndex((l) => l.startsWith("|---")) + 1, 0, `| ${v} | ${new Date().toISOString().slice(0, 10)} | \`${empreinteCourte(texte)}\` | \`${sha256(fs.readFileSync(p(fige)))}\` |`);
  fs.writeFileSync(vf, lignes.join("\n"));
  console.log(`\nVersion ${v} signée par l'auteur. Numéro de référence : ${empreinteCourte(texte)}`);
} else {
  console.log("Usage : node tools/version.mjs preparer | finaliser [dossier des signatures]");
}
