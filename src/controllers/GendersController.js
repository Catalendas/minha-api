import { prisma } from "../../prisma/index.js";

export class GendersController {
    async index(req, res) {
        const genders = await prisma.gender.findMany()
        return res.json(genders)
    }
}