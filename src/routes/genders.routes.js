import { Router } from "express"
import { GendersController } from "../controllers/GendersController.js"

export const gendersRouter = Router()
const gendersController = new GendersController()

gendersRouter.get("/", gendersController.index)