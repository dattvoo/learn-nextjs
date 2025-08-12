import dishesAPIRequest from "@/apiRequests/dishes"
import { UpdateDishBodyType } from "@/schemaValidations/dish.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetDishesList = () => {
    return useQuery({
        queryKey: ['dishes'],
        queryFn: dishesAPIRequest.getDishesList
    })
}

export const useGetDetailDishes = (id: number) => {
    return useQuery({
        queryKey: ['dishes', id],
        queryFn: () => dishesAPIRequest.getDetailDish(id),
        enabled: Boolean(id)
    })
}

export const useAddDishesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: dishesAPIRequest.addDish,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dishes']
            })
        }
    })
}

export const useUpdateDishesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...body }: UpdateDishBodyType & { id: number }) => dishesAPIRequest.updateDish(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dishes']
            })
        }

    })
}

export const useDeleteDishesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: dishesAPIRequest.deleteDish,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dishes']
            })
        }
    })
}