import axios from 'axios';

export const fetchWeatherData = (style, lat, long, radius) => {
  return axios
    .get(
      `http://127.0.0.1:5000/get-crags?style=${style}&lat=${lat}&lon=${long}&radius=${radius}&api_key=${process.env.REACT_APP_API_KEY}` // Ensure the API key is used correctly
    )
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error };
    });
};

export default fetchWeatherData;
