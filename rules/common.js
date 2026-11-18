/*
 * Kerckhoffs — règles valables dans tous les pays.
 * Format : voir rules/registry.js.
 */
Kerckhoffs.ajouterCommun([
  {
    id: "email",
    label: "Email addresses",
    type: "EMAIL",
    re: /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g,
    exemples: { trouve: ["jean.exemple@example.ch"], ignore: ["Rue du Lac 12"] }
  },
  {
    id: "longnum",
    label: "Long numbers (8 digits or more)",
    type: "NUMERO",
    re: /\b\d{8,}\b/g,
    exemples: { trouve: ["48291736"], ignore: ["1234567"] }
  }
]);
