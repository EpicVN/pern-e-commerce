import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";

const productRoutes = express.Router();

productRoutes.get("/", getProducts)
productRoutes.get("/:id", getProduct)
productRoutes.post("/", createProduct)
productRoutes.put("/:id", updateProduct)
productRoutes.delete("/:id", deleteProduct)


export default productRoutes;
