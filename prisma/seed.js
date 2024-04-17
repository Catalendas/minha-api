import { prisma } from "./index.js"

async function main() {
    const january = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Janeiro"
        }
    })
    const february = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Fevereiro"
        }
    })
    const march = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Março"
        }
    })
    const april = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Abril"
        }
    })
    const may = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Maio"
        }
    })
    const june = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Junho"
        }
    })
    const july = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Julho"
        }
    })
    const august = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Agosto"
        }
    })
    const september = await prisma.games_timeframe.create({
        data: {
            timeframe_description: "Setembro"
        }
    })

    const october = await prisma.games_timeframe.create({
        data: {

            timeframe_description: "Outubro"
        }
    })

    const november = await prisma.games_timeframe.create({
        data: {

            timeframe_description: "Novembro"
        }
    })

    const december = await prisma.games_timeframe.create({
        data: {

            timeframe_description: "Dezembro"
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })