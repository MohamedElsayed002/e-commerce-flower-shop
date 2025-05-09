import { getAllCategories } from "@/lib/apis/dashboard/categories.api";
import { useQuery } from "@tanstack/react-query";
export const useGetAllCategories =  () => {

    const {data,isPending,error} = useQuery({
        queryKey: ['all categories'],
        queryFn: () => getAllCategories() 
    })

    return {
        data,
        isPending,
        error
    }
}