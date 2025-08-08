import http from "@/lib/http";
import {
  CreateDishBodyType,
  DishListResType,
  DishResType,
  UpdateDishBodyType,
} from "@/schemaValidations/dish.schema";

const prefix = "/dishes";

const dishesAPIRequest = {
  getDishesList: () => {
    return http.get<DishListResType>(`${prefix}`);
  },

  getDetailDish: (id: number) => {
    return http.get<DishResType>(`${prefix}/${id}`);
  },

  addDish: (body: CreateDishBodyType) => {
    return http.post<DishResType>(`${prefix}`, body);
  },

  updateDish: (id: number, body: UpdateDishBodyType) => {
    return http.put<DishResType>(`${prefix}/${id}`, body);
  },
  deleteDish: (id: number) => {
    return http.delete<DishResType>(`${prefix}/${id}`);
  },
};

export default dishesAPIRequest;
