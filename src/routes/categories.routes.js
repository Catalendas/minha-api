import { Router } from "express"
import { CategoriesController } from "../controllers/CategoriesController.js"

export const categoriesRouter = Router()
const categoriesController = new CategoriesController()

categoriesRouter.get("/", categoriesController.index)