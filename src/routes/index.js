import { Router } from "express"
import { productRouter } from "./product.routes.js"
import { gendersRouter } from "./genders.routes.js"
import { plataformRouter } from "./plataforms.routes.js"
import { productTypesRouter } from "./productTypes.routes.js"
import { priceRouter } from "./price.routes.js"

export const router = Router()

router.use("/products", productRouter)
router.use("/genders", gendersRouter)
router.use("/plataform", plataformRouter)
router.use("/producttypes", productTypesRouter)
router.use("/price", priceRouter)

