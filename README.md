# Kerckhoffs

**Mask your personal data before you use an AI. Works offline.**

Kerckhoffs removes personal information from a photo or a document before you send it to ChatGPT, Claude or another AI. Everything happens on your phone or computer. Nothing is sent anywhere.

## How to use it

**Take a photo of a document**, or **import it**: a photo you already took, an image or a PDF, one or several pages. Kerckhoffs finds names and numbers on its own. A name becomes `[PERSON_A]`, a Swiss AHV number becomes `[AVS_A]`. Kerckhoffs never links anything by itself: every masked place gets its own letter, even if the text is written the same way. You are the one who gives the same letter to several places ("All matches", or "Link…"), and the document says so. You check, you complete with your finger (brush or rectangle), then you send it as image and text (best for the AI, with a short instruction at the top of the text), image only, PDF, smaller image or text only. You read the AI's answer with your original in front of you: you know who is who.

Until the document is confirmed, the screen shows the watermark "ORIGINAL · NOT MASKED · DO NOT SEND".

**Remove Before Flight**, the check before sending, reads again what is still visible and flags what could still identify you: a name after "Mr" or "Mrs", a sensitive word, a barcode, a forgotten date, anything shaped like an identifier, and areas of writing that could not be read (tiny, blurry or handwritten text), in orange. It also warns you when several pieces of information remain visible together (a postcode, an age, sex, health information): combined, they are often enough to find someone. It suggests, you decide. Its rules are in `rules/remove-before-flight.js`.

**To go further with detection:**
- **Identifiers are recognized by their shape**, in any country: letters and digits mixed, groups of digits, repeated separators (see `K.formeIdentifiant` in `rules/registry.js`). A very typical shape is masked straight away, a doubtful one is flagged.
- **"All matches"** looks separately for each piece of information in the framed area, and shows what it found: move from one to the next with the arrows ‹ ›.
- **"Search here"** reads the visible area up close, on the full-resolution photo: useful for small print.
- **The final sweep** looks everywhere for what has already been masked once. It is automatic at the Strict level.

After confirmation, a short animation shows the masked areas falling like sand: what is masked no longer exists. One tap on the work screen turns it off, and it disappears by itself if the phone is set to reduce motion.

**The Strict level**, for professionals, makes this check mandatory: every point must be handled, then a final preview shows exactly what will be sent.

**The notice at the bottom of the document.** Every document sent carries a small band at the bottom: "Masked by the user, with Kerckhoffs", with "erased in paper color" when that is the case, and "checked point by point" or "not checked point by point" depending on the level. At the Strict level, it can be removed. In any case, every area erased without a label carries a small red "kerckhoffs.app" mark, which is part of the image. It contains no date, no device and no number. On a small area, it is the logo with ":ON". When Kerckhoffs cannot read a page (photo too blurry, a script it does not know), it switches to **K:OFF**: automatic detection turns off, erasing with your finger still works, the page carries a light "K:OFF" watermark and a line that explains it. The notice is not a guarantee from Kerckhoffs: the person who sends the document checks and confirms what is sent.

## Why you can trust it

Read [TRUST.md](TRUST.md). In short:

- **Try airplane mode**: Kerckhoffs works completely without a connection.
- **Double lock**: the page forbids the browser to contact any other site (CSP security rule), and the service worker refuses any request to the outside.
- **All the code is public**, including the libraries it uses, copied into `vendor/` (origin and fingerprints in [vendor/PROVENANCE.md](vendor/PROVENANCE.md)).
- **An automatic check** blocks any change that would add internet access (`tools/check.sh`, run before every release).
- **Every release is signed** by the author, and the app refuses any unsigned update. For sensitive use, a **frozen version** in one signed file never updates itself. See [VERSIONS.md](VERSIONS.md).

## What Kerckhoffs does not do for you

Automatic detection can miss something, especially on a blurry photo or handwriting. **Always check** the result before sending it. For patient or client data, the responsibility stays with the professional.

## Using Kerckhoffs

Open the official address of Kerckhoffs, **kerckhoffs.app**, on your phone. The code is public: the address of the official repository is given on kerckhoffs.app. Once the page has loaded, it stays available offline. You can add it to your home screen ("Add to Home screen" in the browser menu).

To run it on your computer:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Adapting Kerckhoffs

The project is provided **as is**. There is no maintenance commitment. Copy it, adapt it to your country, your profession or your organization: the AGPL license allows it, on one condition. If you offer a modified version to other people, including through a website, you publish its source code too, under the same license. Kerckhoffs stays open, and nobody can make a closed version of it.

- **Add your country**: each country has its file in `rules/countries/` (Switzerland: `rules/countries/ch.js`). Copy `rules/countries/_template.js`, fill it in, and check it with `node rules/test.js`. Everything is explained in [rules/README.md](rules/README.md).
- The text-reading model is French (`vendor/tesseract/lang/fra.traineddata.gz`). Other languages, English included, are available in the `@tesseract.js-data` packages.
- After each change, update `VERSION` in `sw.js`.

## Supporting the project

If Kerckhoffs is useful to you, a donation is welcome. *(Address to come.)*

## License and libraries

Kerckhoffs is distributed under the [GNU AGPL 3.0 or later](LICENSE). It uses:

- [Tesseract.js](https://github.com/naptha/tesseract.js) to read text (Apache 2.0)
- [PDF.js](https://github.com/mozilla/pdf.js) to open PDFs (Apache 2.0)
- [jsPDF](https://github.com/parallax/jsPDF) to create PDFs (MIT)

The name pays tribute to Auguste Kerckhoffs, who wrote in 1883 in *La Cryptographie militaire* that a secure system must stay secure even if the enemy knows everything about how it works. That is exactly the idea of open source.

> "It must not require secrecy, and it must be able to fall into the hands of the enemy without inconvenience." Auguste Kerckhoffs, 1883.
