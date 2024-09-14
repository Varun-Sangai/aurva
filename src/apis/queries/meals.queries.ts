import { queryOptions, useQuery} from "@tanstack/react-query";
import { HTTPOptions } from "../../types";
import { queryClient } from "../../main";
import { fetchMeal, fetchMealsFilteredByCategory } from "../requests/meals.request";

export function mealFilteredByCategoryOptions(c:string,options?: HTTPOptions) {
  return queryOptions({
    queryKey: ["meals",c],
    queryFn: () => fetchMealsFilteredByCategory(c,options),
    staleTime: 120* 1000,
  });
}

export function mealOptions(id?:string,options?: HTTPOptions) {
  return queryOptions({
    queryKey: ["meal",id],
    queryFn: () => fetchMeal(id || "",options),
    staleTime: 360*1000,
    enabled:Boolean(id)
  });
}

export const useMeal=(id?:string)=> useQuery(mealOptions(id));

export const queryMealFilteredByCategory = async (c:string) => {
  try {
    const data = await queryClient.fetchQuery(mealFilteredByCategoryOptions(c));
    return data;
  } catch (err) {
    throw "Error Filtering Meal by this Category!!"
  }
};


export const queryMeal=async (id:string) => {
  try {
    const data = await queryClient.fetchQuery(mealOptions(id));
    return data;
  } catch (err) {
    throw "Error getting meal!!"
  }
};
