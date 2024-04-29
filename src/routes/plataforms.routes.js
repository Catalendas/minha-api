import { Router } from "express";
import { PlataformController } from "../controllers/PlataformController.js";

export const plataformRouter = Router()
const plataformController = new PlataformController()

plataformRouter.get("/", plataformController.index)
