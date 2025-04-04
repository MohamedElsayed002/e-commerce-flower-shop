    'use client';
    import { useQuery } from '@tanstack/react-query';
    import { fetchProducts } from '../apis/product.api';

    export const useProducts = (rating: string, status: string | string[]) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', rating, status],
        queryFn: () => {
        return fetchProducts({
            rating,
            status: Array.isArray(status) ? status : [status],
        });
        },
        enabled: !!rating && !!status, // optional: to prevent unnecessary calls
    });
    console.log(data)
    return { data, isLoading, error };
    };
