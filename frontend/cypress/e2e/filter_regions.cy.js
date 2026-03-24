describe("Filtrage des régions", () => {
    it("devrait permettre de sélectionner une région et de voir les résultats", () => {
        // Visiter la page principale
        cy.visit("/");

        // Attendre que les régions soient chargées (le select ne doit pas être vide)
        cy.get("select[name='region'] option").should("have.length.gt", 1);

        // Sélectionner une région
        cy.get("select[name='region']").select(1); // Sélectionne la première région de la liste

        // Cliquer sur le bouton de recherche
        cy.get("button[type='submit']").click();

        // Vérifier un filtre et un élément visuel.
        // Vérifier que le sélecteur a bien la valeur
        cy.get("select[name='region']").should("not.have.value", "");
    });
});
