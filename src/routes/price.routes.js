import { Router } from "express";
import { PriceController } from "../controllers/PriceController.js";

export const priceRouter = Router()
const priceController = new PriceController()

priceRouter.post("/", priceController.create)

