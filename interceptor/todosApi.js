import {
  API_BASE_URL,
  DEFAULT_TIMEOUT,
} from "../config/apiConfig.js";

const tasksApi = axios.create({
  baseURL: API_BASE_URL,
});

tasksApi.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Set timeout for the request (you can customize this based on your needs)
    config.timeout = config.timeout || DEFAULT_TIMEOUT;

    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

tasksApi.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    // Handle errors in the response
    if (err.response) {
      if (err.response.status === 404) {
        // Handle 404 Not Found (wrong endpoint)
        console.error("End Point Not found");
      } else {
        console.error(
          `Error ${err.response.status}:`,
          err.response.data,
        );
      }
    } else if (err.request) {
      console.error("No response received");

      // if (
      //   err.message === "Network Error" ||
      //   err.code === "ECONNABORTED"
      // ) {
      //   console.error(
      //     "Server is unreachable or no internet connection.",
      //   );
      // } else {
      //   console.error("Unknown error:", err.message);
      // }
    } else {
      console.error("Error:", err.message);
    }
    return Promise.reject(err);
  },
);

export { tasksApi };
