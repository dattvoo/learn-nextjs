import dishesAPIRequest from "@/apiRequests/dishes"
import { useQuery } from "@tanstack/react-query"


export const useGetDishesList = () => {

    return useQuery({
        queryKey: ['dishes'],
        queryFn: dishesAPIRequest.getDishesList
    })

}