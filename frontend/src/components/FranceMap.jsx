import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix images resolution issue on React-Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom highlighted marker for hovered cities
const hoverIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom marker for origin point
const originIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const FRANCE_CENTER = [46.603354, 1.888334];
const FRANCE_BOUNDS = [
    [41.0, -5.8],
    [51.5, 9.8],
];

function MapEventsHandler({ onMapClick }) {
    useMapEvents({
        click(event) {
            onMapClick(event.latlng);
        },
    });

    return null;
}

function FranceMap({ cities, origin, hoveredCityId, onHoverCity, onMapClick }) {
    return (
        <MapContainer
            center={FRANCE_CENTER}
            zoom={6}
            minZoom={5}
            maxZoom={14}
            maxBounds={FRANCE_BOUNDS}
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
            <TileLayer
                attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a>"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEventsHandler onMapClick={onMapClick} />

            {/* Display the point clicked by the user */}
            {origin && (
                <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
                     <Popup>Point de recherche</Popup>
                </Marker>
            )}

            {/* Display the nearby cities */}
            {cities.map((city) => {
                const isHovered = hoveredCityId === city.id;

                return (
                    <Marker
                        key={city.id}
                        position={[city.latitude, city.longitude]}
                        icon={isHovered ? hoverIcon : new L.Icon.Default()}
                        eventHandlers={{
                            mouseover: () => onHoverCity(city.id),
                            mouseout: () => onHoverCity(null),
                        }}
                    >
                        <Popup>
                            <strong>{city.name}</strong>
                            <br />
                            Distance : {city.distance_km} km
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}

export default FranceMap;