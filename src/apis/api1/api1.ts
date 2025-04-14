import axios from 'axios';

export const fetchWeatherData = (style, lat, long, radius) => {
  console.log(
    `http://127.0.0.1:5000/get-crags?style=${style}&lat=${lat}&lon=${long}&radius=${radius}`
  );
  return axios
    .get(
      `http://127.0.0.1:5000/get-crags?style=${style}&lat=${lat}&lon=${long}&radius=${radius}`
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return { error };
    });
};

export default fetchWeatherData;
