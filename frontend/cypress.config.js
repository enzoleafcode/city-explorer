const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    setupNodeEvents(on, config) {
      // Implémenter les listeners d'événements node ici
    },
    supportFile: false
  },
});
