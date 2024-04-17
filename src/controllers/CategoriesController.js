import { prisma } from "../../prisma/index.js";

export class CategoriesController {
    async index(req, res) {
        const categories = await prisma.categories.findMany()
        return res.json(categories)
    }
}