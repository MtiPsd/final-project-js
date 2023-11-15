import { showErrorAlert } from "../components/Noty.js";
import {
  API_BASE_URL,
  DEFAULT_TIMEOUT,
} from "../config/apiConfig.js";

const tasksApi = axios.create({
  baseURL: API_BASE_URL,
});

tasksApi.interceptors.request.use(
  config => {
    const isRequestBodyObject =
      ["POST", "PUT", "PATCH"].includes(config.method) &&
      typeof config.data === "object";

    config = {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: config.timeout || DEFAULT_TIMEOUT,
      data: isRequestBodyObject
        ? JSON.stringify(config.data)
        : config.data,
    };

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
    if (err.response) {
      if (err.response.status === 404) {
        // Handle 404 Not Found (wrong endpoint)
        console.error(
          "End Point Not found:",
          err.response.config.url,
        );

        showErrorAlert(
          "An error occurred while processing your request. Please try again later",
        );
      } else if (err.response.status === 500) {
        // Handle 500
        console.error("Internal Server Error:", err.response.data);
        showErrorAlert("Something wrong with the server");
      } else {
        console.error(
          `Error ${err.response.status}:`,
          err.response.data,
        );
      }
    } else if (err.request) {
      console.error("No response received");

      if (
        err.message === "Network Error" ||
        err.code === "ECONNABORTED"
      ) {
        showErrorAlert(
          "We’re sorry, but the server is currently unavailable. Please try again later",
        );
      } else {
        showErrorAlert(
          "We’re sorry, but there seems to be a problem with your internet connection. Please check your connection and try again later.",
        );
      }
    } else {
      console.error("Error:", err.message);
    }
    return Promise.reject(err);
  },
);

export { tasksApi };
