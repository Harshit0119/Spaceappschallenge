// client/src/components/TerraCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faLeaf, faTemperatureHigh, faDownload } from '@fortawesome/free-solid-svg-icons';

function TerraCard({ location, data, onExportCSV, onExportJSON }) {
  if (!data) return <p>Loading {location} data...</p>;

  return (
    <div className="fade-in" style={{ marginTop: '2rem', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px' }}>
      <h2>🛰️ {location} Satellite Data</h2>
      <p><strong>Timestamp:</strong> {data.timestamp}</p>
      <p><FontAwesomeIcon icon={faTemperatureHigh} /> <strong>Temperature:</strong> {data.temperature}°C</p>
      <p><FontAwesomeIcon icon={faLeaf} /> <strong>Vegetation Index:</strong> {data.vegetationIndex}</p>
      <p><FontAwesomeIcon icon={faCloudSun} /> <strong>Cloud Coverage:</strong> {data.cloudCoverage}</p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={onExportCSV} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
          <FontAwesomeIcon icon={faDownload} /> CSV
        </button>
        <button onClick={onExportJSON} style={{ padding: '0.5rem 1rem' }}>
          <FontAwesomeIcon icon={faDownload} /> JSON
        </button>
      </div>
    </div>
  );
}

export default TerraCard;