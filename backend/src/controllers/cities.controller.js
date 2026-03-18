const pool = require("../config/db");

async function getNearbyCities(req, res) {
    try {
        const {
            lat,
            lng,
            limit = 10,
            maxDistance = 100,
            minPopulation = 0,
            region = "",
        } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ error: "lat et lng sont requis" });
        }

        const values = [
            Number(lng),
            Number(lat),
            Number(maxDistance) * 1000,
            Number(minPopulation),
        ];

        let query = `
            SELECT
                id,
                name,
                population,
                region,
                ST_Y(geom) AS latitude,
                ST_X(geom) AS longitude,
                ROUND(
                        ST_DistanceSphere(
                                geom,
                                ST_SetSRID(ST_MakePoint($1, $2), 4326)
                        ) / 1000
                ) AS distance_km
            FROM cities
            WHERE ST_DistanceSphere(
                          geom,
                          ST_SetSRID(ST_MakePoint($1, $2), 4326)
                  ) <= $3
              AND population >= $4
        `;

        if (region.trim() !== "") {
            values.push(region.trim());
            query += ` AND region = $${values.length}`;
        }

        values.push(Number(limit));
        query += ` ORDER BY distance_km ASC LIMIT $${values.length}`;

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error("getNearbyCities error:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

async function getRegions(req, res) {
    try {
        const query = `
            SELECT DISTINCT region
            FROM cities
            ORDER BY region ASC
        `;

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error("getRegions error:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

module.exports = {
    getNearbyCities,
    getRegions,
};