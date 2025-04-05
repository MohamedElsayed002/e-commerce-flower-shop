export async function fetchProducts({ rating, status }: { rating?: string; status?: string[] }) {
    try {
        const params = new URLSearchParams();

        // Add rating filter if available
        if (rating) {
            params.set("rateAvg[gte]", rating);
        }

        // Add status filters dynamically
        if (status?.includes("on-sale")) {
            params.set("priceAfterDiscount[gt]", "0");
        }
        if (status?.includes("in-stock")) {
            params.set("quantity[gt]", "0");
        }

        const response = await fetch(`${process.env.API}/products?${params.toString()}`, {
            cache: "no-cache"
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const payload: ProductResponse = await response.json();

        if ("error" in payload) {
            throw new Error(payload.error);
        }

        return payload;
    } catch (error) {
        console.error("Error fetching products: ", error);
        return null;
    }
}