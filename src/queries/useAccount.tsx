import accountAPIRequest from "@/apiRequests/account";
import { useQuery } from "@tanstack/react-query"

// const useQuerry = useQueries()

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["get-profile"],
        queryFn: accountAPIRequest.getAccount,
    })
}