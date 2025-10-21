import { Router } from "express"
import { addCart, getAllCartItems, removeCartItem } from "./cart.contollers.js";
import { verifyToken } from "../../utils/generateWebTokens.js";

const route = Router();

// route.use(verifyToken)
route.post("/", verifyToken, addCart);
route.get("/", verifyToken, getAllCartItems);
route.delete("/:id", verifyToken, removeCartItem);

export default route;