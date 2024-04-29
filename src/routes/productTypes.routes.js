import { Router } from "express";
import { ProductTypesController } from "../controllers/ProductTypesController.js";

export const productTypesRouter = Router()
const productTypesController = new ProductTypesController()

productTypesRouter.get("/", productTypesController.index)