import { useEffect, useState } from "react";
import api from "../services/api";

function FiltersForm({ onSearch, currentFilters }) {
    const [regions, setRegions] = useState([]);
    const [form, setForm] = useState({
        region: currentFilters?.region || "",
        limit: currentFilters?.limit || 50,
        maxDistance: currentFilters?.maxDistance || 50,
        minPopulation: currentFilters?.minPopulation || 1000,
    });

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await api.get("/cities/regions");
                setRegions(response.data);
            } catch (error) {
                console.error("Erreur chargement régions :", error);
            }
        };

        fetchRegions();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSearch({
            region: form.region,
            limit: Number(form.limit),
            maxDistance: Number(form.maxDistance),
            minPopulation: Number(form.minPopulation),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="filters-form">
            <h2 className="filters-title">Critères de recherche</h2>

            <div className="filter-group">
                <label className="filter-label">Région</label>
                <select
                    className="filter-input select-input"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                >
                    <option value="">Toutes les régions</option>
                    {regions.map((item, index) => (
                        <option key={index} value={item.region}>
                            {item.region}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">
                    Nombre de villes : <strong>{form.limit}</strong>
                </label>
                <input
                    className="filter-input"
                    type="range"
                    name="limit"
                    min="10"
                    max="200"
                    step="10"
                    value={form.limit}
                    onChange={handleChange}
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">
                    Distance max : <strong>{form.maxDistance} km</strong>
                </label>
                <input
                    className="filter-input"
                    type="range"
                    name="maxDistance"
                    min="5"
                    max="200"
                    step="5"
                    value={form.maxDistance}
                    onChange={handleChange}
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">
                    Population min :{" "}
                    <strong>{Number(form.minPopulation).toLocaleString("fr-FR")}</strong>
                </label>
                <input
                    className="filter-input"
                    type="range"
                    name="minPopulation"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={form.minPopulation}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="filter-btn">
                Appliquer les filtres
            </button>
        </form>
    );
}

export default FiltersForm;