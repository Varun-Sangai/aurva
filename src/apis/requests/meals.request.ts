import {HTTPOptions, Meal, PartialMeal } from "../../types";
import http from "../http";

export const fetchMealsFilteredByCategory=async(c:string,options?:HTTPOptions) => {  
    const data=await http.get<{meals:PartialMeal[]}>(
      `/filter.php?c=${c}`,
      options
    );
    return data.meals;
  };


export const fetchMealsFilteredByIngredient=async(i:string,options?:HTTPOptions) => {  
    const data=await http.get<{meals:PartialMeal[]}>(
      `/filter.php?i=${i}`,
      options
    );
    return data.meals;
  };

export const fetchMeal=async(i:string,options?:HTTPOptions) => {  
    const data=await http.get<{meals:Meal[]}>(
      `/lookup.php?i=${i}`,
      options
    );
    return data.meals[0];
  };