export const apiUrl = "http://localhost:8800";

export const requestConfig = (method, data = null, token = null) => {
  const config = { method, headers: {} };

  if (data instanceof FormData) {
    config.body = data;
  } else if (data) {
    config.body = JSON.stringify(data);
    config.headers["Content-Type"] = "application/json";
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
