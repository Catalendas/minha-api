import { prisma } from "../../prisma/index.js";

export class PlataformController {
    async index(req, res) {
        const plataforms = await prisma.plataform.findMany()
        return res.json(plataforms)
    }
}