import { Router } from "express";
import pdtsRoute from "./pdt/pdt.routes.js";
import authRoute from "./user/users.routes.js";
import cartRoute from "./cart/cart.routes.js";
import searchRoute from "./search/searchRoutes.js";

const route = Router();

route.use('/pdts', pdtsRoute);
route.use('/auth', authRoute);
route.use('/cart', cartRoute);
route.use('/search', searchRoute);

export default route;