import { getAllOrders } from "@/lib/apis/dashboard/orders.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllOrders =  () => {

    const {data,isPending,error} = useQuery({
        queryKey: ['all orders'],
        queryFn: () => getAllOrders() 
    })

    return {
        data,
        isPending,
        error
    }
}