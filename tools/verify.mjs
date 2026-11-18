#!/usr/bin/env node
/*
 * Kerckhoffs — vérifier une version.  /  Verify a release.
 *
 *   node tools/verify.mjs [dossier]
 *
 * Vérifie que chaque fichier correspond à checksums.txt, et que checksums.txt est bien signé
 * par la clé publique de l'auteur. Sans Node, les mêmes vérifications se font avec deux commandes :
 *   sha256sum -c checksums.txt
 *   openssl pkeyutl -verify -pubin -inkey public-key.pem -rawin -in checksums.txt -sigfile checksums.sig
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { texteEmpreintes, empreinteCourte, version } from "./checksums.mjs";

const racine = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
const lire = (f) => fs.readFileSync(path.join(racine, f));
let ok = true;
const ko = (m) => { ok = false; console.log("✗ " + m); };

const publiee = lire("checksums.txt").toString("utf8");
const calculee = texteEmpreintes(racine);
if (publiee !== calculee) {
  const a = new Map(publiee.trim().split("\n").map((l) => l.split("  ").reverse()));
  for (const l of calculee.trim().split("\n")) {
    const [h, f] = l.split("  ");
    if (a.get(f) !== h) ko(`${f} ne correspond pas à checksums.txt`);
    a.delete(f);
  }
  for (const f of a.keys()) ko(`${f} est dans checksums.txt mais plus dans l'application`);
  if (ok) ko("checksums.txt n'est pas à jour");
}
const cle = crypto.createPublicKey(lire("public-key.pem"));
if (!crypto.verify(null, Buffer.from(publiee, "utf8"), cle, lire("checksums.sig"))) ko("la signature ne correspond pas : cette version n'est pas signée par l'auteur");

// La clé inscrite dans l'application doit être la même que public-key.pem.
const brute = cle.export({ type: "spki", format: "der" }).subarray(-32).toString("base64");
const dansApp = (lire("verification.js").toString("utf8").match(/CLE_AUTEUR = "([^"]+)"/) || [])[1];
if (dansApp !== brute) ko("la clé publique inscrite dans verification.js n'est pas celle de public-key.pem");

// La version figée, si elle est là : signée elle aussi, avec la même clé.
const fige = `download/kerckhoffs-${version(racine)}.html`;
if (fs.existsSync(path.join(racine, fige))) {
  if (!fs.existsSync(path.join(racine, fige + ".sig")) || !crypto.verify(null, lire(fige), cle, lire(fige + ".sig"))) ko(`${fige} n'est pas signé par l'auteur`);
  else console.log(`✓ ${fige} signé par l'auteur`);
}

console.log(ok ? `✓ Version ${version(racine)} signée par l'auteur. Empreinte : ${empreinteCourte(publiee)}` : "\nCette version n'est PAS la version officielle signée.");
process.exit(ok ? 0 : 1);
