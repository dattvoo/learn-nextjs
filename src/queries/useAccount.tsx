import accountAPIRequest from "@/apiRequests/account";
import { UpdateEmployeeAccountBodyType } from "@/schemaValidations/account.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


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

export const useChangePasswordMutation = () => {

    return useMutation({
        mutationFn: accountAPIRequest.changePassword
    })
}
export const useChangePasswordMutationV2 = () => {

    return useMutation({
        mutationFn: accountAPIRequest.changePasswordV2
    })
}

// Employee
// Get List

export const useGetAccountList = () => {
    return useQuery({
        queryKey: ['accounts'],
        queryFn: accountAPIRequest.getEmployeeList
    })
}

export const useGetAccount = ({ id }: { id: number }) => {
    return useQuery({
        queryKey: ['account', id],
        queryFn: () => accountAPIRequest.getEmployee(id),
        enabled: Boolean(id)
    })
}
export const useAddAccountMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: accountAPIRequest.addNewEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['accounts']
            })
        }
    })
}
export const useUpdateAccountMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...body }: UpdateEmployeeAccountBodyType & { id: number }) => accountAPIRequest.updateEmployee(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['accounts']
            })
        }
    })
}

export const useDeleteAccountMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: accountAPIRequest.deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['accounts']
            })
        }
    })
}