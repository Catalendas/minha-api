import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";

export const productRouter = Router()
const productController = new ProductController()

productRouter.get("/", productController.index)

productRouter.post("/", productController.create)

productRouter.get("/:product_id", productController.show)