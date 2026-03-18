function CityList({ cities, hoveredCityId, onHoverCity }) {
    if (!cities || cities.length === 0) {
        return <div className="status-message">Aucune ville trouvée dans ce rayon.</div>;
    }

    return (
        <ul className="city-list">
            {cities.map((city) => {
                const isHovered = hoveredCityId === city.id;

                return (
                    <li
                        key={city.id}
                        className={`city-list-item ${isHovered ? "hovered" : ""}`}
                        onMouseEnter={() => onHoverCity(city.id)}
                        onMouseLeave={() => onHoverCity(null)}
                    >
                        <span className="city-list-name">{city.name}</span>
                        <span className="city-list-distance">{city.distance_km} km</span>
                    </li>
                );
            })}
        </ul>
    );
}

export default CityList;