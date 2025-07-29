declare type Category = {
  name: string;
  image: string;
  productsCount: number;
  slug: string;
  id: string;
} & DatabaseFields;


declare type DeleteCategory = {
    name: string;
    slug: string;
    image: string;
} & DatabaseFields

declare type CategoryResponse = {
  document: DeleteCategory;
}