import accountAPIRequest from "@/apiRequests/account";
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetProfile = () => {
    return useQuery({
        queryKey: ["get-profile"],
        queryFn: accountAPIRequest.getAccount,
    })
}

export const useUpdateMeMutation = () => {

    return useMutation({
        mutationFn: accountAPIRequest.updateMe
    })
}