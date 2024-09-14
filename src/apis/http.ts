import axios from "axios";
import { HTTPOptions } from "../types";


/**
 * Generate Request URL
 */
export const getURL = (url: string, options: {mockedURL?: string }) => {
    const baseURL = options?.mockedURL ? options.mockedURL : import.meta.env.VITE_API_URL;
    return baseURL + url;
};


/**
 * HTTP GET Request
 */
const fetchGet= async<T> (url: string, options?: HTTPOptions) => {
  try{
  const result = await axios.get(
    getURL(url, { mockedURL:options?.mockedURL || "" })
  );
    
  return result.data as T;
  }catch(err){
    throw err;
  }
}


const http = {
  get: fetchGet
};

export default http;
