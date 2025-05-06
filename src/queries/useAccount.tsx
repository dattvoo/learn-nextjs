import accountAPIRequest from "@/apiRequests/account";
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetProfile = () => {
    return useQuery({
        queryKey: ["get-profile"],
        queryFn: accountAPIRequest.getAccount,
    })
}

export const useGetData = () => {
    return useQuery({
        queryKey: ['get-data'],
        queryFn: accountAPIRequest.getData
    })
}

export const useUpdateMeMutation = () => {

    return useMutation({
        mutationFn: accountAPIRequest.updateMe
    })
}

export const useChangePasswordMutation = () => {


    return useMutation({
        mutationFn: accountAPIRequest.changePassword
    })
}