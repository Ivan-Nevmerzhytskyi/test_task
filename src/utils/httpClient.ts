import axios, { AxiosRequestConfig } from 'axios';

// Server API:
const BASE_URL = process.env.REACT_APP_BASE_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: AxiosRequestConfig = {
    baseURL: BASE_URL,
    url,
    method,
    // withCredentials: true,
    // responseType: 'json', // json(default), arraybuffer, text, stream
  };

  if (data) {
    options.data = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return axios(options)
    .then(response => {
      if (!response.headers['content-type']?.includes('application/json')) {
        throw new Error('Content-type is not supported');
      }

      return response.data;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
};
