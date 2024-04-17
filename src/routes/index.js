import { Router } from "express"
import { gamesRouter } from "./games.routes.js"
import { categoriesRouter } from "./categories.routes.js"

export const router = Router()

router.use("/games", gamesRouter)
router.use("/categories", categoriesRouter)

