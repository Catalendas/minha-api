import { Router } from "express";
import { GameController } from "../controllers/GameController.js";

export const gamesRouter = Router()
const gamesController = new GameController()

gamesRouter.get("/", gamesController.index)

gamesRouter.post("/", gamesController.create)

gamesRouter.get("/:game_id", gamesController.show)