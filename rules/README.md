# Règles de détection

*English below.*

Tout ce que Kerckhoffs sait reconnaître tout seul est écrit ici, en clair, dans des fichiers courts que chacun peut lire.

| Fichier | Contenu |
|---|---|
| `registry.js` | Le format d'une règle, et rien d'autre |
| `common.js` | Ce qui se reconnaît partout : e-mails, longs numéros |
| `countries/ch.js` | Suisse : AVS, IBAN, adresses, codes postaux, téléphones |
| `countries/_template.js` | Le modèle à copier pour ajouter un pays |
| `test.js` | Vérifie toutes les règles grâce à leurs exemples |

Les noms et prénoms ne sont pas ici : rien dans leur forme ne permet de les reconnaître à coup sûr. L'utilisateur les écrit lui-même dans « Réglages ».

## Ajouter un pays en quatre étapes

1. **Copiez** `countries/_template.js` sous le code ISO du pays, par exemple `countries/in.js` pour l'Inde.
2. **Remplissez** le code, le nom et les règles. Chaque règle reconnaît **une forme** : un numéro d'identité, un code postal, un téléphone… Donnez des **exemples** : ceux qui doivent être trouvés (`trouve`) et ceux qui ne doivent pas l'être (`ignore`). Utilisez uniquement des exemples fictifs.
3. **Déclarez** le fichier à deux endroits : une ligne `<script src="rules/countries/in.js"></script>` dans `index.html`, et une ligne `"rules/countries/in.js",` dans la liste `FILES` de `sw.js`.
4. **Vérifiez** : `node rules/test.js`. Le même test est relancé avant chaque envoi d'une version (`tools/check.sh`).

Le pays apparaît alors dans « Réglages → Pays des documents ».

**Règle d'or** : une règle ne fait que reconnaître du texte. Elle ne doit jamais rien charger ni envoyer. Le contrôle automatique refuse toute règle qui essaierait.

---

# Detection rules

Everything Kerckhoffs can recognise on its own is written here, in plain sight, in short files anyone can read: `registry.js` (the rule format), `common.js` (e-mails, long numbers), `countries/ch.js` (Switzerland), `countries/_template.js` (template), `test.js` (checks every rule against its examples). Names are not detected automatically; users type them in Settings.

## Add a country in four steps

1. **Copy** `countries/_template.js` using the country's ISO code, e.g. `countries/in.js` for India.
2. **Fill in** the code, name and rules. Each rule recognises **one pattern** (ID number, postcode, phone…). Give **examples** that must be found (`trouve`) and must not be (`ignore`). Use fictitious examples only.
3. **Declare** the file in `index.html` (`<script src="rules/countries/in.js"></script>`) and in the `FILES` list of `sw.js`.
4. **Check**: `node rules/test.js`. The same test runs before every release is pushed (`tools/check.sh`).

**Golden rule**: a rule only recognises text. It must never load or send anything.
