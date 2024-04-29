import { prisma } from "../../prisma/index.js";

export class ProductTypesController {
    async index(req, res) {
        const productTypes = await prisma.product_type.findMany()
        return res.json(productTypes)
    }
}