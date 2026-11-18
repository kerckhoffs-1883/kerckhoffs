# Kerckhoffs releases

Every official release is signed by the author of Kerckhoffs. This list is the reference: if the reference number shown in your app ("Check my version") is not the one on this page, at the official address, it is not an official release.

| Version | Date | Reference number | Frozen version (SHA-256 of the file) |
|---|---|---|---|
| 0.6.2 | 2026-10-25 | `AE2D-FE2A-7CA0-14A5` | `61efabec6edbf3dfdd5e9c348f9e1d97d45e9fb37e83ec8e356f2f42e1cbed0f` |
| 0.6.1 | 2026-10-22 | `C3F5-27BA-D8FE-E038` | `e543d50b496ce18770d5f03bc13ce1b1d3011331f8d0f534e515aa5bf828945b` |

Test versions (0.8.x and 0.9.x) are not signed and are not listed here. They are proven by timestamped records, kept in `timestamps/`.

## No update on its own

The version you checked when you installed it stays exactly the same, with or without internet, until you delete it. Without a connection, nothing is missing: your version works completely.

If a new version exists, Kerckhoffs tells you, that is all. You go and get it yourself, with "Look for a new version" on the home screen. It is then downloaded, checked file by file, and only replaces yours if you tap "Use it". If a single byte was changed by anyone other than the author, it is refused and a red banner warns you.

## The frozen version, for sensitive use

A single file, `download/kerckhoffs-<version>.html`. It opens with a double-click, works without internet and never updates itself: what you checked once stays exactly what you use. It is signed with the same key (`.html.sig`).

## Check it yourself

The author's public key is in `public-key.pem` (Ed25519). It is also written in `verification.js`.

With Node, from the repository folder:

    node tools/verify.mjs

Without Node, with tools found on almost every computer:

    sha256sum -c checksums.txt
    openssl pkeyutl -verify -pubin -inkey public-key.pem -rawin -in checksums.txt -sigfile checksums.sig
    openssl pkeyutl -verify -pubin -inkey public-key.pem -rawin -in download/kerckhoffs-<version>.html -sigfile download/kerckhoffs-<version>.html.sig

All three must answer "OK" or "Signature Verified Successfully".

The reference number is the start of the SHA-256 of `checksums.txt`, in four groups.

## Proof of date in the Bitcoin blockchain

Some files are timestamped with OpenTimestamps: their fingerprint is written in a Bitcoin block. Nobody, not even the author, can make it look as if they were created later or changed since.

| File | Proof | Bitcoin block |
|---|---|---|
| `public-key.pem` (the author's key) | `public-key.pem.ots` | 972,602, 22 October 2026 |
| `timestamps/0.6.1/empreintes.txt` (the file list of version 0.6.1, reference number `C3F5-27BA-D8FE-E038`) | `timestamps/0.6.1/empreintes.txt.ots` | 972,602, 22 October 2026 |
| `brand/logo-guide.html` (the logo) | `brand/logo-guide.html.ots` | 972,602, 22 October 2026 |

To check without installing anything: on [opentimestamps.org](https://opentimestamps.org), drop the file and its `.ots` proof. The site must answer "Bitcoin block 972602 attests existence as of 2026-10-22".

To check with your own Bitcoin node: `ots verify public-key.pem.ots` (OpenTimestamps client). The Merkle root of block 972,602, as shown by block explorers, is `b7210b1d54a4805eab86a8b93449889b2e0b607b97309785935d8907ad395e4c`.

## Messages from the author

Every message from the author is signed with the same key. To check one: in Kerckhoffs, "Check my version", then "Check a message from the author". A message without a valid signature does not come from the author.
