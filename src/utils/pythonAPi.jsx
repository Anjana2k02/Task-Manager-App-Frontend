import axios from "axios";

// Add FastAPI base URL
const HOST_FASTAPI = "http://localhost:8000";

// Create a separate instance if needed
const axiosFastApi = axios.create({ baseURL: HOST_FASTAPI });

axiosFastApi.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error.response || 'Something went wrong')
);

// New fetcher for FastAPI GET with params
export const getFastAPIParamFetcher = async (url, params = {}, config = {}) => {
  const res = await axiosFastApi.get(url, {
    params,
    ...config,
  });
  return res.data;
};

export const fastApi = {
    facialStatus: "/stream_status",
    test : "/test",
}