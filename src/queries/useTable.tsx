import { tableAPIRequest } from "@/apiRequests/table"
import { UpdateTableBodyType } from "@/schemaValidations/table.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetListTable = () => {
    return useQuery({
        queryKey: ['table'],
        queryFn: tableAPIRequest.getTableList
    })
}

export const useGetDetailTable = (id: number) => {
    return useQuery({
        queryKey: ['table', id],
        queryFn: () => tableAPIRequest.getDetailTable(id)
    })
}

export const useAddTableMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: tableAPIRequest.addTable,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['table']
            })
        }
    })
}

export const useEditTableMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, ...body }: UpdateTableBodyType & { id: number }) => {
            return tableAPIRequest.updateTable(id, body)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['table']
            })
        }
    })
}
export const useDeleteTableMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: tableAPIRequest.deleteTable,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['table']
            })
        }
    })
}