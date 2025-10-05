import axios from 'axios';

export const getBackendStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return response.data;
  } catch (error) {
    console.error('Backend connection error:', error.message);
    return 'Error connecting to backend';
  }
};

export const getTerraData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/terra-data');
    return response.data;
  } catch (error) {
    console.error('Terra data fetch error:', error.message);
    return null;
  }
};