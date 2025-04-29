import axios from "axios";

const HOST_API = "http://localhost:8080/api";

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error.response || 'Something went wrong')
);



// ---------------------------------------------------------
export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
  
    const res = await axiosInstance.get(url, { ...config });
  
    return res.data;
  };
  
  export const getFetcher = async (url, config) => {
    const res = await axiosInstance.get(url, { ...config });
    return res.data;
  };

  
  export const getFetcherPrams = async (url, data, params, config) => {
    const res = await axiosInstance.get(url, data, { params, ...config });
    return res.data;
  };
  
  export const getFetcherPramspdf = async (url, params, config) => {
    const res = await axiosInstance.get(url, { params, ...config, responseType: 'blob' });
    return res;
  };
  
  export const postFetcher = async (url, data, config) => {
    const res = await axiosInstance.post(url, data, { ...config });
    return res.data;
  };
  
  export const putFetcher = async (url, data, config) => {
    const res = await axiosInstance.put(url, data, { ...config });
    return res.data;
  };
  
  export const deleteFetcher = async (url, config) => {
    const res = await axiosInstance.delete(url, { ...config });
    return res.data;
  };
  
  export const postPramsFetcher = async (url, data, params, config) => {
    const res = await axiosInstance.post(url, data, { params, ...config });
    return res.data;
  };
  
  
  export const postFetcher1 = async (url, data, config) => {
    const res = await axiosInstance.post(url, data, { ...config });
    return res;
  };

  
  export const enpoints = {

    user: {
      create: "/user/create",
      update: "/user/update",
      delete: "/user/delete/{id}",
      view: "/user/view/{id}",
      viewAll: "/user/view/all",
      report: "/user/report",
    },

    supervisor: {
      create: "/supervisor/create",
      update: "/supervisor/update",
      delete: "/supervisor/delete/{id}",
      view: "/supervisor/view/{id}",
      viewAll: "/supervisor/view/all",
      report: "/supervisor/report",
    },

    worker: {
      create: "/worker/create",
      update: "/worker/update",
      delete: "/worker/delete/{id}",
      view: "/worker/view/{id}",
      viewAll: "/worker/view/all",
      report: "/worker/report",
    },

    admin: {
      create: "/admin/create",
      update: "/admin/update",
      delete: "/admin/delete/{id}",
      view: "/admin/view/{id}",
      viewAll: "/admin/view/all",
      report: "/admin/report",
    },
    
    task: {
      create: "/task/create",
      update: "/task/update",
      delete: "/task/delete/{id}",
      view: "/task/view/{id}",
      viewAll: "/task/view/all",
      report: "/task/report",
    },
  }


  // lashan dev test 1