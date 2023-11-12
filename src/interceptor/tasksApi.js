import { API_BASE_URL } from "../config/apiConfig.js";

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
      // timeout: config.timeout || DEFAULT_TIMEOUT,
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
        console.error("End Point Not found");
      } else {
        console.error(
          `Error ${err.response.status}:`,
          err.response.data,
        );
      }
    } else if (err.request) {
      console.error("No response received");
    } else {
      console.error("Error:", err.message);
    }
    return Promise.reject(err);
  },
);

export { tasksApi };
