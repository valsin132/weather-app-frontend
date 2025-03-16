import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL || `https://weather-app-backend-green-gamma.vercel.app`;

export const fetchWeatherData = async (cityName) => {
  const openWeatherMapApiKey = import.meta.env.VITE_OPENWEATHERMAP_API;
  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherMapApiKey}&units=metric`,
    );
    const hourlyResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${openWeatherMapApiKey}&units=metric`,
    );
    return {
      weatherData: weatherResponse.data,
      weatherDataHourly: hourlyResponse.data,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const saveSearch = async (selectedCity) => {
  try {
    const response = await axios.post(`${API_URL}/api/search`, {
      selectedCity,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving search:', error);
    throw error;
  }
};

export const fetchTopCities = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/search/top`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top cities:', error);
    throw error;
  }
};
