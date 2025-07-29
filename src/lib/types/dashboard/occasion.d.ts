declare type Occasions = {
  name: string;
  slug: string;
  image: string;
  productsCount: number;
} & DatabaseFields;

type OccasionCreateFields = {
  name: string;
  image: File;
};

type OccasionUpdateFields = {
  name: string;
  image?: string;
};

declare type OccasionResponse = {
  message: string;
  metadata: Metadata;
  occasions: Occasions;
};