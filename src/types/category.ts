export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};


export type PartialCategory=Pick<Category,"strCategory">;