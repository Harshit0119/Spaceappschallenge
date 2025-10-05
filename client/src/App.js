import React, { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import TerraCard from './components/TerraCard';
import GIBSLayerSelector from './components/GIBSLayerSelector';
import { BASE_URL } from './api'; // ✅ Import backend URL

const locations = [
  { name: 'Bhopal', coords: [23.2599, 77.4126] },
  { name: 'Delhi', coords: [28.6139, 77.2090] },
  { name: 'Bengaluru', coords: [12.9716, 77.5946] }
];

function App() {
  const [locationData, setLocationData] = useState({});
  const [selectedLayer, setSelectedLayer] = useState('MODIS_Terra_CorrectedReflectance_TrueColor');
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const fetchAllLocationData = async () => {
    const results = {};
    for (const loc of locations) {
      try {
        const res = await fetch(`${BASE_URL}/api/terra-data?location=${loc.name}`); // ✅ Use live backend
        const data = await res.json();
        results[loc.name] = data;
      } catch (err) {
        console.error(`Error fetching data for ${loc.name}`, err);
      }
    }
    setLocationData(results);
  };

  const exportAsCSV = (locName) => {
    const data = locationData[locName];
    if (!data) return;
    const csv = `timestamp,location,temperature,vegetationIndex,cloudCoverage\n` +
                `${data.timestamp},${data.location},${data.temperature},${data.vegetationIndex},${data.cloudCoverage}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${locName}-terra-data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = (locName) => {
    const data = locationData[locName];
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${locName}-terra-data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchAllLocationData();
    const interval = setInterval(() => {
      fetchAllLocationData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/modern-logo.png" alt="TerraScope Logo" style={{ height: '60px' }} />
        <h1 style={{ margin: '0.5rem 0' }}>🌍 TerraScope Dashboard</h1>
        <p style={{ fontStyle: 'italic', margin: 0 }}>Real-time satellite insights for smarter decisions</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button onClick={fetchAllLocationData} style={{ padding: '0.5rem 1rem' }}>
          🔄 Refresh Terra Data
        </button>

        <GIBSLayerSelector selectedLayer={selectedLayer} onChange={setSelectedLayer} />

        <div>
          <label><strong>📅 Select Date:</strong></label>
          <input
            type="date"
            min="2000-01-01"
            max={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
          />
        </div>
      </div>

      {/* TerraCards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {locations.map(loc => (
          <TerraCard
            key={loc.name}
            location={loc.name}
            data={locationData[loc.name]}
            onExportCSV={() => exportAsCSV(loc.name)}
            onExportJSON={() => exportAsJSON(loc.name)}
          />
        ))}
      </div>

      {/* Map */}
      <div style={{ marginTop: '3rem' }}>
        <h2>🗺️ Satellite View</h2>
        <MapContainer center={[23.2599, 77.4126]} zoom={5} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${selectedLayer}/default/${selectedDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`}
            attribution="NASA GIBS"
            tileSize={256}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="OpenStreetMap contributors"
          />
          {locations.map(loc => {
            const data = locationData[loc.name];
            if (!data) return null;
            return (
              <Marker key={loc.name} position={loc.coords}>
                <Popup>
                  {loc.name}: {data.temperature}°C, NDVI: {data.vegetationIndex}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <p><strong>Layer:</strong> {selectedLayer} | <strong>Date:</strong> {selectedDate}</p>
      </div>

      {/* Impact Story */}
      <div style={{ marginTop: '2rem', background: '#e0f7fa', padding: '1rem', borderRadius: '8px' }}>
        <h3>🌱 Impact Story</h3>
        <p>
          Over 25 years, Bhopal has seen rising temperatures and shrinking green cover. TerraScope visualizes this change using MODIS data from NASA’s Terra satellite, helping citizens and policymakers understand the urgency of climate action.
        </p>
      </div>
    </div>
  );
}

export default App;