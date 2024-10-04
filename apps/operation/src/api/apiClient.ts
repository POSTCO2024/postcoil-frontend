import axios from 'axios';

export interface ApiParams {
  pageCode?: string;
  processCode?: string;
  rollUnit?: string;
  requestParams?: string;
}

export const createApiClient = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};
