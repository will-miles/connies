import axios from 'axios';

export const fetchData = () => {
  return axios
    .get('some url')
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return { error };
    });
};
