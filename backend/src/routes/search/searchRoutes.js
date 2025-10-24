import { Router } from "express";
import { Products } from "../../database/pdts.schema.js";

const route = Router();

route.get("/:query", async (req, res) => {
    const { query } = req.params;
    try {
        const searchResult = await Products.find({ name: { $regex: query, $options: "i" } });
        res.json({ query, data: searchResult });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default route;