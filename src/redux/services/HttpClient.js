import axios from "axios";

const client = axios.create({
  baseURL: "https:example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    if (config?.data instanceof FormData) {
      // set headers for FormData
      config.headers = {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      };
    } else {
      // set headers for JSON data
      config.headers = {
        ...config?.headers,
        "Content-Type": "application/json",
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);
const setAuthorization = (token) => {
  client.defaults.headers.common.authorization = `Bearer ${token}`;
};

const clearAuthorization = () => {
  delete client.defaults.headers.common.authorization;
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };
