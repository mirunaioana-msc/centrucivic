import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(async (request) => {
  try {
    // Needed HMAC Request
  } catch (err) {
    return request;
  }

  return request;
});

API.interceptors.response.use(
  async (response) => {
    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (error: any) => {
    if (error?.response?.status === 403) {
      window.location.href = '/';
    }

    throw error;
  },
);

export default API;
