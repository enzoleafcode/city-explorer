/**
 * Formater un nombre de population pour la lisibilité (ex: 1000000 -> "1 000 000")
 * @param {number|string} population 
 * @returns {string}
 */
function formatPopulation(population) {
    if (population === undefined || population === null) return "0";
    const num = Number(population);
    if (isNaN(num)) return "0";
    return num.toLocaleString("fr-FR");
}

module.exports = {
    formatPopulation,
};
