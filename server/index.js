const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Backend status route
// app.get('/api/status', (req, res) => {
//   res.send('✅');
// });

// ✅ Terra data route with location query
app.get('/api/terra-data', (req, res) => {
  const location = req.query.location || 'India';

  const mockData = {
    timestamp: new Date().toISOString(),
    location,
    temperature: (25 + Math.random() * 10).toFixed(1), // 25–35°C
    vegetationIndex: (0.5 + Math.random() * 0.5).toFixed(2), // 0.5–1.0
    cloudCoverage: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
  };

  res.json(mockData);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 TerraScope backend running at http://localhost:${PORT}`);
});