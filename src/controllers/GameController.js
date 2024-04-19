import { prisma } from "../../prisma/index.js";

export class GameController {
    async index(req, res) {

        const { game_search, category_name, game_variation, game_order, skip, take } = req.query

        const totalGames = await prisma.games.count()
        const totalPages = Math.ceil(totalGames / take)

        let category
        let gameVariation
        
        const game_name = {}
        const game_price = {}
        const orderBy = {}
        if (category_name) {
            category = category_name.split(",")
        }

        if (game_variation) {
            gameVariation = game_variation.split(",").map((e, i, arr) => parseFloat(e))

            if (gameVariation[0]) {
                game_price.gte = gameVariation[0]
            }
    
            if (gameVariation[1]) {
                game_price.lte = gameVariation[1]
            }
        }      
        
        if (game_order === "price-highest") {
            orderBy.game_price = "desc"
        } else if (game_order === "a-z") {
            orderBy.game_name = "asc"
        } else if (game_order === "z-a") {
            orderBy.game_name = "desc"
        } else if (game_order === "updatedAt") {
            orderBy.updateDate = "desc"
        } else {
            orderBy.game_price = "asc"
        }

        if (game_search) {
            game_name.contains = String(game_search)
            game_name.mode = "insensitive"
        }


        let games = await prisma.games.findMany({
            include: {
                Games_price: {
                    include: {
                        country: true
                    }
                },
                Games_categories: true
            },
            where: {
                game_price,
                Games_categories: {
                    some: {
                        categorye: {
                            category_name: {
                                in: category ? category : undefined
                            }
                        }
                    }
                },
                game_name,
            },
            orderBy: [
                orderBy,
                { game_id: 'asc'}
            ],
            skip: (Number(skip) - 1) * Number(take),
            take: Number(take),
        })
        return res.json({games, totalPages})
    }

    async create(req, res) {
        const {
            game_name, 
            game_eneba_url, 
            game_image_url, 
            game_price, 
            game_isActive, 
            game_categories,
            game_country
        } = req.body

        let gamePrice

        let gameSplit = game_name.split(" ")
        gameSplit.pop()
        let gameRename = gameSplit.join(" ")
        
        const gamesExist = await prisma.games.findFirst({
            where: {
                game_name: gameRename
            }
        })

        const game_isActiveFormate = JSON.parse(game_isActive.toLowerCase())

        if (gamesExist) {

            let countryExist = await prisma.country.findFirst({
                where: {
                    country_name: game_country
                }
            })

            if (!countryExist?.country_id) {
                countryExist = await prisma.country.create({
                    data: {
                        country_name: game_country
                    }
                })
            }

            let gamePriceUpdate = await prisma.games.update({
                data: {
                    game_price
                }, where: {
                    game_id: gamesExist.game_id
                }
            })

            gamePrice = await prisma.games_price.create({
                data: {
                    game_price,
                    game_id: gamesExist.game_id,
                    timeframe_id: new Date().getMonth() + 1,
                    game_isActive: game_isActiveFormate,
                    country_id: countryExist.country_id,
                    game_eneba_url
                }
            })

            return res.json(gamePrice)
        }

        const game = await prisma.games.create({
            data: {
                game_name: gameRename,
                game_image_url,
                game_price
            }
        })

        let countryExist = await prisma.country.findFirst({
            where: {
                country_name: game_country
            }
        })

        if (!countryExist?.country_id) {
            countryExist = await prisma.country.create({
                data: {
                    country_name: game_country
                }
            })
        }

        gamePrice = await prisma.games_price.create({
            data: {
                game_price,
                game_id: game.game_id,
                timeframe_id: new Date().getMonth() + 1,
                game_isActive: game_isActiveFormate,
                country_id: countryExist.country_id,
                game_eneba_url
            }
        })

        game_categories.forEach(async (e) => {

            const categoryExist = await prisma.categories.findFirst({
                where: {
                    category_name: e
                }
            })

            if (!categoryExist) {
                const catetegories = await prisma.categories.create({
                    data: {
                        category_name: e
                    }
                })

                const games_categories = await prisma.games_categories.create({
                    data: {
                        categorye_id: catetegories.category_id,
                        game_id: game.game_id,
                    }
                })
            } else {
                const games_categories = await prisma.games_categories.create({
                    data: {
                        categorye_id: categoryExist.category_id,
                        game_id: game.game_id,
                    }
                })
            }
           
        })
        return res.status(201).json({})
    }

    async show(req, res) {
        const { game_id } = req.params

        const id = Number(game_id)
        const game = await prisma.games.findFirst({
            where: {
                game_id: id
            },
            include: {
                Games_price: {
                    include: {
                        country: true
                    }
                }
            }
        })

        return res.json(game)
    }
}