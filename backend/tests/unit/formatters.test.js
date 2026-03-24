const { formatPopulation } = require("../../src/utils/formatters");

describe("formatPopulation", () => {
    test("devrait formater correctement un grand nombre avec des espaces", () => {
        // Normaliser les espaces pour éviter les conflits entre \u00a0 et \u202f selon les versions de Node
        const result = formatPopulation(1000000).replace(/\s/g, " ");
        expect(result).toBe("1 000 000");
    });

    test("devrait retourner '0' pour une valeur invalide", () => {
        expect(formatPopulation("abc")).toBe("0");
    });

    test("devrait retourner '0' pour null ou undefined", () => {
        expect(formatPopulation(null)).toBe("0");
        expect(formatPopulation(undefined)).toBe("0");
    });
});
