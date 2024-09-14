import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../requests/categories.requests";
import { HTTPOptions } from "../../types";
import { queryClient } from "../../main";

export function categoryOptions(options?: HTTPOptions) {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(options),
    staleTime: 120*1000,
  });
}

export const useCategories = () => useQuery(categoryOptions());

export const queryCategories = async () => {
  try {
    const data = await queryClient.fetchQuery(categoryOptions());
    return data;
  } catch (err) {
    throw "Error fetching categories!!";
  }
};
