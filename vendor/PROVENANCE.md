# Provenance des bibliothèques · Library provenance

Kerckhoffs n'utilise que des bibliothèques libres, copiées telles quelles dans ce dossier : aucune n'est chargée depuis internet.
Chaque fichier ci-dessous est **identique à l'original** publié sur npm (registre public des paquets JavaScript) : même empreinte SHA-256.
Pour le vérifier soi-même : `npm pack <paquet>@<version>`, ouvrir l'archive, et comparer l'empreinte du fichier indiqué.

Kerckhoffs only uses free-software libraries, copied unchanged into this folder: none is loaded from the internet.
Each file below is **identical to the original** published on npm (the public JavaScript package registry): same SHA-256 fingerprint.
To check it yourself: `npm pack <package>@<version>`, open the archive, and compare the fingerprint of the listed file.

| Fichier · File | Paquet npm · npm package | Version | Chemin dans le paquet · Path in package | SHA-256 |
|---|---|---|---|---|
| `vendor/pdfjs/pdf.min.js` | `pdfjs-dist` | 6.5.438 | `legacy/build/pdf.min.mjs` | `522ad2c83bc8a0010e7f0cc60d0892b77c8d2bf2c9702dc12288311d94270f42` |
| `vendor/pdfjs/pdf.worker.min.js` | `pdfjs-dist` | 6.5.438 | `legacy/build/pdf.worker.min.mjs` | `b4c8353ded0d88d2e2009574a29eb4e0c3ff7e942ecdf51ef5f71566a9667f31` |
| `vendor/pdfjs/LICENSE` | `pdfjs-dist` | 6.5.438 | `LICENSE` | `0d542e0c8804e39aa7f37eb00da5a762149dc682d7829451287e11b938e94594` |
| `vendor/pdfjs/wasm/openjpeg.wasm` | `pdfjs-dist` | 6.5.438 | `wasm/openjpeg.wasm` | `7ea4b2b04613370ad4e9c1162da750cc88b4b176eac0d0c164b3caff23fc0a46` |
| `vendor/pdfjs/wasm/jbig2.wasm` | `pdfjs-dist` | 6.5.438 | `wasm/jbig2.wasm` | `466f45c2a61a698152fb5400c27e56ff2ceb73dcb71fde3fc366a502308eaab0` |
| `vendor/pdfjs/wasm/qcms_bg.wasm` | `pdfjs-dist` | 6.5.438 | `wasm/qcms_bg.wasm` | `663d86126d5f5fcb1c61490f94353e2a8375660b8c5498ab3ebab5a34b08800e` |
| `vendor/pdfjs/wasm/LICENSE_OPENJPEG` | `pdfjs-dist` | 6.5.438 | `wasm/LICENSE_OPENJPEG` | `a6af136f3e15038a666b61f376612a07d9a4e48cb7c01adbf3e33b3f14ab49b6` |
| `vendor/pdfjs/wasm/LICENSE_PDFJS_OPENJPEG` | `pdfjs-dist` | 6.5.438 | `wasm/LICENSE_PDFJS_OPENJPEG` | `717fc62da03292dbb4dd0c8280bd4ce7bb8550dcf31d772bc93455fb50313425` |
| `vendor/pdfjs/wasm/LICENSE_JBIG2` | `pdfjs-dist` | 6.5.438 | `wasm/LICENSE_JBIG2` | `9e66b7f1b934a28b37f3bc4dac97915de1674271e79a0a88182a18ed9731b4d1` |
| `vendor/pdfjs/wasm/LICENSE_PDFJS_JBIG2` | `pdfjs-dist` | 6.5.438 | `wasm/LICENSE_PDFJS_JBIG2` | `aad3cce09842e00e9e11ad5e8fef8cc02fbc3a3768fe2f007443b9cee37aaee5` |
| `vendor/pdfjs/wasm/LICENSE_QCMS` | `pdfjs-dist` | 6.5.438 | `wasm/LICENSE_QCMS` | `36d847ae882f6574ebc72f56a4f354e4f104fde4a584373496482e97d52d31bc` |
| `vendor/pdfjs/wasm/LICENSE_PDFJS_QCMS` | `pdfjs-dist` | 6.5.438 | `wasm/LICENSE_PDFJS_QCMS` | `508a77d2e7b51d98adeed32648ad124b7b30241a8e70b2e72c99f92d8e5874d1` |
| `vendor/tesseract/tesseract.min.js` | `tesseract.js` | 5.1.1 | `dist/tesseract.min.js` | `a8e29918d098b2b06e1012bdaeffb4aec0445c5d5654709023e0bd1f442a80e8` |
| `vendor/tesseract/worker.min.js` | `tesseract.js` | 5.1.1 | `dist/worker.min.js` | `aca1229639fc9907d86f96e825955a2b7c5716d17f3bc3acd71f9c7ab66181fc` |
| `vendor/tesseract/LICENSE` | `tesseract.js` | 5.1.1 | `LICENSE.md` | `b40930bbcf80744c86c46a12bc9da056641d722716c378f5659b9e555ef833e1` |
| `vendor/tesseract/core/tesseract-core-lstm.wasm.js` | `tesseract.js-core` | 5.1.1 | `tesseract-core-lstm.wasm.js` | `8f04aa0cc81e7bde33f80e92fa01a7a665f0b4884d098acf5de9c7104a11dfaa` |
| `vendor/tesseract/core/tesseract-core-simd-lstm.wasm.js` | `tesseract.js-core` | 5.1.1 | `tesseract-core-simd-lstm.wasm.js` | `ce20eda9533cbed1e6c2b4276fbae1e0adc61b6754b5513084be601787b457cf` |
| `vendor/tesseract/LICENSE-core` | `tesseract.js-core` | 5.1.1 | `LICENSE` | `c6596eb7be8581c18be736c846fb9173b69eccf6ef94c5135893ec56bd92ba08` |
| `vendor/tesseract/lang/fra.traineddata.gz` | `@tesseract.js-data/fra` | 1.0.0 | `4.0.0_best_int/fra.traineddata.gz` | `d611139672b3752c7097e671e4a1d9209dfd37f2aeb081ef6487fba3351e9255` |
| `vendor/jspdf/jspdf.umd.min.js` | `jspdf` | 4.2.1 | `dist/jspdf.umd.min.js` | `e6551fcdc32f09d6853b2c5126d18d01d9447e0da618a41a11ebeee0f6c20d54` |
| `vendor/jspdf/LICENSE` | `jspdf` | 4.2.1 | `LICENSE` | `dc388ec35ff463288cdde3588a36fd4ed12a45deff053243b37309acc9ef583b` |
| `vendor/jsqr/jsQR.js` | `jsqr` | 1.4.0 | `dist/jsQR.js` | `bc40c8a15196236b2314db0856f72ca0b49980cd5413b8c852a7349f5fee0859` |
| `vendor/jsqr/LICENSE` | `jsqr` | 1.4.0 | `LICENSE` | `c6596eb7be8581c18be736c846fb9173b69eccf6ef94c5135893ec56bd92ba08` |
| `vendor/qrcode/qrcode.js` | `qrcode-generator` | 1.4.4 | `qrcode.js` | `18ae399f81182bc9de916e9c77b195df20cc58d6f2d55a62b085a299f1bf1780` |
| `vendor/tweetnacl/nacl.min.js` | `tweetnacl` | 1.0.3 | `nacl.min.js` | `973cc5733cc7432e30ee4682098f413094f494bccf76a567c23908c5035ddbbc` |
| `vendor/tweetnacl/LICENSE` | `tweetnacl` | 1.0.3 | `LICENSE` | `88d9b4eb60579c191ec391ca04c16130572d7eedc4a86daa58bf28c6e14c9bcd` |

## PDF.js

Les deux fichiers de PDF.js sont les modules de la version « legacy » (compatible avec plus de téléphones), renommés de `.mjs`
en `.js` pour être servis partout comme du JavaScript ; leur contenu est identique à l'original (même empreinte). La version figée
(un seul fichier) fait tourner l'assistant de lecture comme un worker classique : elle retire seulement, au moment de l'ouvrir,
la dernière ligne `export{…}` et remplace `import.meta.url` par l'adresse du worker (voir `outils/fichier-fige.mjs`).
La faille CVE-2024-4367 des anciennes versions (jusqu'à 4.1.392) ne concerne plus Kerckhoffs.

The two PDF.js files are the "legacy" build modules (compatible with more phones), renamed from `.mjs` to `.js` so they are served
as JavaScript everywhere; their content is identical to the original (same fingerprint). The frozen single-file version runs the
PDF worker as a classic worker: when it opens, it only removes the last `export{…}` line and replaces `import.meta.url` with the
worker's address (see `outils/fichier-fige.mjs`). CVE-2024-4367, which affected old versions (up to 4.1.392), no longer applies.
