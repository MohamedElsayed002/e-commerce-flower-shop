type ProductApiResponse = {
  products: Product[];
};

const fetchProducts = async (minPrice?: number, maxPrice?: number): Promise<Product[]> => {
  const url = new URL(`${process.env.API}/products`);

  if (minPrice !== undefined) {
    url.searchParams.append("price[gte]", String(minPrice));
  }
  if (maxPrice !== undefined) {
    url.searchParams.append("price[lte]", String(maxPrice));
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch products");
  const json: ProductApiResponse = await res.json();
  return json.products;
};
