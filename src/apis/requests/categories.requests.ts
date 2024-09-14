import { Category, HTTPOptions } from "../../types";
import http from "../http";

export const fetchCategories = async(options?:HTTPOptions) => {  
    const data= await http.get<{categories:Category[]}>(
      `/categories.php`,
      options
    );
    return data.categories;
  };