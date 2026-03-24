require("dotenv").config();
const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/config/db");

describe("Cities Integration Tests", () => {
    // Fermer la connexion à la base de données après les tests
    afterAll(async () => {
        await pool.end();
    });

    test("GET /api/cities/nearby devrait retourner une liste de villes (Statut 200)", async () => {
        const response = await request(app)
            .get("/api/cities/nearby")
            .query({
                lat: 48.8566, // Paris
                lng: 2.3522,
                maxDistance: 50,
                limit: 5
            });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty("name");
            expect(response.body[0]).toHaveProperty("distance_km");
        }
    });

    test("GET /api/cities/regions devrait retourner la liste des régions (Statut 200)", async () => {
        const response = await request(app).get("/api/cities/regions");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty("region");
        }
    });

    test("GET /api/cities/nearby avec une région spécifique", async () => {
        // Récupèrer d'abord une région existante
        const regionsRes = await request(app).get("/api/cities/regions");
        if (regionsRes.body.length > 0) {
            const testRegion = regionsRes.body[0].region;
            
            const response = await request(app)
                .get("/api/cities/nearby")
                .query({
                    lat: 48.8566,
                    lng: 2.3522,
                    region: testRegion,
                    limit: 5
                });

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(city => {
                expect(city.region).toBe(testRegion);
            });
        }
    });
});
