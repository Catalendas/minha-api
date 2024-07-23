import { prisma } from "../../prisma/index.js";

export class PriceController {
    async create(req, res) {
        const { product_name, product_price, product_country, product_image_url, product_isActive, product_url } = req.body

        let productSplit = product_name.split(" ")

        productSplit.pop()

        let productRename = productSplit.join(" ")

        let productsExist = await prisma.products.findFirst({
            where: {
                product_name: productRename
            }
        })

        // Formatando se o protudo está ativo
        const product_isActiveFormate = JSON.parse(product_isActive.toLowerCase())

        if (productsExist) {
            let countryExist = await prisma.country.findFirst({
                where: {
                    country_name: product_country
                }
            })

            if (!countryExist?.country_id) {
                countryExist = await prisma.country.create({
                    data: {
                        country_name: product_country
                    }
                })
            }
            const values = await prisma.products_price.findMany({ where: { product_id: productsExist.product_id }, orderBy: {
                createdAt: "desc"
            }})

            const finalValuesAdded = values.reduce((red, obj) => {
                if(!red.hasOwnProperty(obj.country_id)) {
                    red[obj.country_id] = obj.product_price
                } 
                
                return red
            }, {})

            finalValuesAdded[countryExist.country_id] = product_price

            let productPrice

            const filteredFinalValues = Object.values(finalValuesAdded).filter((number) => number !== 0)
            if (filteredFinalValues.length) {
                const minValueFiltered = Math.min(...filteredFinalValues)

                if (product_price > minValueFiltered || minValueFiltered !== 0) {
                    productPrice = minValueFiltered
                } else {
                    productPrice = product_price
                }
            } else {
                productPrice = 0
            }     

            // Atulizando o preço atual do jogo
            await prisma.products.update({
                data: {
                    product_price: productPrice,
                    product_image_url
                }, where: {
                    product_id: productsExist.product_id
                }
            })

            // Criando a variação do preço
            productPrice = await prisma.products_price.create({
                data: {
                    product_price,
                    product_id: productsExist.product_id,
                    timeframe_id: new Date().getMonth() + 1,
                    product_isActive: product_isActiveFormate,
                    country_id: countryExist.country_id,
                    product_url
                }
            })

            return res.json(productPrice)
        }

        return res.json()
    }
}