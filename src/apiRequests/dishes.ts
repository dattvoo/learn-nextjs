import http from "@/lib/http";
import { DishListResType } from "@/schemaValidations/dish.schema";

const prefix = "/dishes";

const dishesAPIRequest = {
  getDishesList: () => {
    return http.get<DishListResType>(`${prefix}`);
  },
};

export default dishesAPIRequest;
