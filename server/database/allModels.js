//Bring all models in one file and import it -> call one file instead ofcalling each seperate files
//if i need 2 or 3 models in 1 single route , u can call alModel.js and import them
import { FoodModel } from "./food";
import { ImageModel } from "./image";
import { MenuModel } from "./menu";
import { OrderModel } from "./order";
import { RestaurantModel } from "./restaurant";
import { ReviewModel } from "./reviews";
import { UserModel } from "./user";

export {
  FoodModel,
  ImageModel,
  MenuModel,
  OrderModel,
  RestaurantModel,
  ReviewModel,
  UserModel,
};
