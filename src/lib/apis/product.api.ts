"use server"

export async function fetchProducts({ rating, status }: { rating?: string; status?: string[] }) {
    try {
        const params = new URLSearchParams();

        const filterMap: { [key: string]: string | null } = {
            "rateAvg[gte]": rating ?? null,
            "priceAfterDiscount[gt]": status?.includes("on-sale") ? "0" : null,
            "quantity[gt]": status?.includes("in-stock") ? "0" : null
        };


        Object.entries(filterMap).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

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
