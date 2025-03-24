import { fetchData } from './api1';
const axios = require('axios');

jest.mock('axios');

it('returns mocked value', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
  });

  const data = await fetchData();
  expect(data[0].id).toEqual(1);
});
