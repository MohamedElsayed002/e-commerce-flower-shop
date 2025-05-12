declare type Occasions = {
  name: string;
  slug: string;
  image: File;
  productsCount: number;
} & DatabaseFields;

declare type OccasionFields = {
  name: string;
  image: File;
};
declare type OccasionResponse = {
  message: string;
  metadata: Metadata;
  occasions: Occasions;
};
