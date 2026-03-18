import { useEffect, useState } from "react";
import api from "./services/api";
import FranceMap from "./components/FranceMap";
import CityList from "./components/CityList";
import FiltersForm from "./components/FiltersForm";
import "./App.css";

function App() {
    const [cities, setCities] = useState([]);
    const [hoveredCityId, setHoveredCityId] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [filters, setFilters] = useState({
        region: "",
        limit: 50,
        maxDistance: 50,
        minPopulation: 1000,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchCities = async (currentOrigin, currentFilters) => {
        if (!currentOrigin) return;
        
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/cities/nearby", {
                params: {
                    lat: currentOrigin.lat,
                    lng: currentOrigin.lng,
                    limit: currentFilters.limit,
                    maxDistance: currentFilters.maxDistance,
                    minPopulation: currentFilters.minPopulation,
                    region: currentFilters.region,
                },
            });

            setCities(response.data);
            setHoveredCityId(null);
        } catch (err) {
            console.error(err);
            setCities([]);
            setHoveredCityId(null);
            setError("Erreur lors du chargement des villes.");
        } finally {
            setLoading(false);
        }
    };

    const handleMapClick = (latlng) => {
        const newOrigin = { lat: latlng.lat, lng: latlng.lng };
        setOrigin(newOrigin);
        fetchCities(newOrigin, filters);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        if (origin) {
            fetchCities(origin, newFilters);
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Carte de France Interactive</h1>
            </header>

            <main className="app-main">
                <section className="app-map-section">
                    <FranceMap
                        cities={cities}
                        origin={origin}
                        hoveredCityId={hoveredCityId}
                        onHoverCity={setHoveredCityId}
                        onMapClick={handleMapClick}
                    />
                </section>

                <aside className="app-sidebar">
                    <FiltersForm
                        onSearch={handleFiltersChange}
                        currentFilters={filters}
                    />
                    
                    {loading && <p className="status-message">Chargement...</p>}
                    {error && <p className="error-message">{error}</p>}
                    {!loading && !error && !origin && (
                        <p className="status-message">Veuillez cliquer sur la carte pour commencer.</p>
                    )}
                    
                    {!loading && !error && origin && (
                        <CityList
                            cities={cities}
                            hoveredCityId={hoveredCityId}
                            onHoverCity={setHoveredCityId}
                        />
                    )}
                </aside>
            </main>
        </div>
    );
}

export default App;