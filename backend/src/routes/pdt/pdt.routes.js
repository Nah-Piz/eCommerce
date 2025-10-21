import { Router } from "express";
import { deletePdt, getAllPdts, getPdt, postPdt } from "./pdt.contorllers.js";

const route = Router();

route.get('/', getAllPdts);
route.get('/:id', getPdt);
route.post('/', postPdt);
route.delete('/:id', deletePdt);

export default route;