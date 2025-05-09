import { getAllStatistics } from "@/lib/apis/dashboard/statistics.api"
import { useQuery } from "@tanstack/react-query"
export const useGetAllStats =  () => {

    const {data,isPending,error} = useQuery({
        queryKey: ['all stats'],
        queryFn: () => getAllStatistics() 
    })

    return {
        data,
        isPending,
        error
    }
}