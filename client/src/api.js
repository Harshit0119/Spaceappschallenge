import axios from 'axios';

const BASE_URL = "https://spaceappschallenge.onrender.com";

export const getBackendStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Backend connection error:', error.message);
    return 'Error connecting to backend';
  }
};

export const getTerraData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/terra-data`);
    return response.data;
  } catch (error) {
    console.error('Terra data fetch error:', error.message);
    return null;
  }
};