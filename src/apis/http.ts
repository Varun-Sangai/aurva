import axios from "axios";
import { HTTPOptions } from "../types";


/**
 * Generate Request URL
 */
export const getURL = (url: string, options: {mockedURL?: string }) => {
    const baseURL = options?.mockedURL ? options.mockedURL : import.meta.env.VITE_API_URL;
    return baseURL + url;
};


//Custom Error Class
export class ApiResponseError extends Error {
  code = 400;

  constructor(message: string, code = 400) {
    super(message || 'Oops! Something went wrong');
    this.name = 'ApiResponseError';
    this.code = code;
  }
}


/**
 * HTTP GET Request
 */
const fetchGet= async<T> (url: string, options?: HTTPOptions) => {
  const result = await axios.get(
    getURL(url, { mockedURL:options?.mockedURL || "" })
  );
    
  return result.data as T;
}


const http = {
  get: fetchGet
};

export default http;
