import { Router } from "express";
import pdtsRoute from "./pdt/pdt.routes.js";
import authRoute from "./user/users.routes.js";
import cartRoute from "./cart/cart.routes.js";

const route = Router();

route.use('/pdts', pdtsRoute);
route.use('/auth', authRoute);
route.use('/cart', cartRoute);

export default route;