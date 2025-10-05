import React from 'react';

function GIBSLayerSelector({ selectedLayer, onChange }) {
  const layers = [
    { id: 'MODIS_Terra_CorrectedReflectance_TrueColor', label: 'True Color (Daily)' },
    { id: 'MODIS_Terra_Land_Surface_Temp_Day', label: 'Land Surface Temp (Daily)' },
    { id: 'MODIS_Terra_NDVI_8Day', label: 'Vegetation Index NDVI (8-Day)' },
    { id: 'MODIS_Terra_Aerosol', label: 'Aerosol Optical Depth (Daily)' }
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label><strong>🛰️ Select Terra Layer:</strong></label>
      <select value={selectedLayer} onChange={(e) => onChange(e.target.value)} style={{ marginLeft: '1rem' }}>
        {layers.map(layer => (
          <option key={layer.id} value={layer.id}>{layer.label}</option>
        ))}
      </select>
    </div>
  );
}

export default GIBSLayerSelector;