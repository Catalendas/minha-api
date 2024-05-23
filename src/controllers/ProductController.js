import { prisma } from "../../prisma/index.js";

export class ProductController {
    async index(req, res) {
        const { 
            product_search, 
            gender_name, 
            product_variation, 
            product_order,
            productType,
            productPlataform, 
            skip, 
            take 
        } = req.query
    
        let gender
        let type
        let plataform
        let productVariation

        // if (!product_variation) {
        //     product_variation = [0.01, ]
        // }

        // console.log(product_variation)
        
        const product_name = {}
        const product_price = {}
        const orderBy = {}
        if (gender_name) {
            gender = gender_name.split(",")
        }
    
        if (productType) {
            type = productType.split(",")
        }
    
        if (productPlataform) {
            plataform = productPlataform.split(",")
        }
    
        if (product_variation) {
            productVariation = product_variation.split(",").map((e, i, arr) => parseFloat(e))
    
            if (productVariation[0]) {
                product_price.gte = productVariation[0]
            }
    
            if (productVariation[1]) {
                product_price.lte = productVariation[1]
            }
        } else {
            product_price.gte = 0.01
        } 
        
        if (product_order === "price-highest") {
            orderBy.product_price = "desc"
        } else if (product_order === "a-z") {
            orderBy.product_name = "asc"
        } else if (product_order === "z-a") {
            orderBy.product_name = "desc"
        } else if (product_order === "updatedAt") {
            orderBy.updatedAt = "desc"
        } else {
            orderBy.product_price = "asc"
        }
    
        if (product_search) {
            product_name.startsWith = String(product_search)
            product_name.mode = "insensitive"
        }
    
        // Conta o total de produtos baseado nos filtros
        const totalProducts = await prisma.products.count({
            where: {
                product_price,
                Products_gender: {
                    some: {
                        Gender: {
                            gender_name: {
                                in: gender ? gender : undefined
                            }
                        }
                    }
                },
                Product_type: {
                    type_description: type ? type : undefined
                },
                Product_plataform: {
                    some: {
                        Plataform: {
                            plataform_description: {
                                in: plataform ? plataform : undefined
                            }
                        }
                    }
                },
                product_name,
            }
        });
    
        const totalPages = Math.ceil(totalProducts / take);
    
        // Realiza a consulta paginada
        let products = await prisma.products.findMany({
            include: {
                Products_price: {
                    include: {
                        country: true
                    }
                },
                Products_gender: true,
                Product_plataform: {
                    include: {
                        Plataform: true
                    }
                }
            },
            where: {
                product_price,
                Products_gender: {
                    some: {
                        Gender: {
                            gender_name: {
                                in: gender ? gender : undefined
                            }
                        }
                    }
                },
                Product_type: {
                    type_description: type ? type : undefined
                },
                Product_plataform: {
                    some: {
                        Plataform: {
                            plataform_description: {
                                in: plataform ? plataform : undefined
                            }
                        }
                    }
                },
                product_name,
            },
            orderBy: [
                orderBy,
                { product_id: 'asc'}
            ],
            skip: (Number(skip) - 1) * Number(take),
            take: Number(take),
        });
    
        return res.json({products, totalPages});
    }

    async create(req, res) {
        const {
            product_name, 
            product_url, 
            product_image_url, 
            product_price, 
            product_isActive, 
            product_gender,
            product_country,
            product_type,
            plataform_name
        } = req.body

        let productPrice

        let productSplit = product_name.split(" ")

        productSplit.pop()

        let productRename = productSplit.join(" ")

        let productTypeExist = await prisma.product_type.findFirst({
            where: {
                type_description: product_type
            }
        })
 
        let productsExist = await prisma.products.findFirst({
            where: {
                product_name: productRename
            }
        })

        let productType
        let plataform

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

            // if (product_price !== 0) {
            await prisma.products.update({
                data: {
                    product_price
                }, where: {
                    product_id: productsExist.product_id
                }
            })
            // }


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
        
        if (!productTypeExist) {
            productTypeExist = await prisma.product_type.create({
                data: {
                    type_description: product_type
                }
            })
        }



        const product = await prisma.products.create({
            data: {
                product_name: productRename,
                product_image_url,
                product_price,
                type_id: productTypeExist.type_id,
            }
        })

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

        productPrice = await prisma.products_price.create({
            data: {
                product_price,
                product_id: product.product_id,
                timeframe_id: new Date().getMonth() + 1,
                product_isActive: product_isActiveFormate,
                country_id: countryExist.country_id,
                product_url
            }
        })


        plataform_name.forEach(async (e) => {
            let plataformExist = await prisma.plataform.findFirst({
                where: {
                    plataform_description: e
                }
            })

            if (!plataformExist) {
                plataformExist = await prisma.plataform.create({
                    data: {
                        plataform_description: e
                    }
                })
            }

            const productTypePlataform = await prisma.product_type_plataform.create({
                data: {
                    product_type_id: productTypeExist.type_id,
                    plataform_id: plataformExist.plataform_id
                }
            })

            const productPlataform = await prisma.product_plataform.create({
                data: {
                    plataform_id: plataformExist.plataform_id,
                    product_id: product.product_id
                }
            })
        })

        product_gender.forEach(async (e) => {

            const genderExist = await prisma.gender.findFirst({
                where: {
                    gender_name: e
                }
            })

            if (!genderExist) {
                const catetegories = await prisma.gender.create({
                    data: {
                        gender_name: e,
                        type_id: productTypeExist.type_id
                    }
                })

                const products_genders = await prisma.products_gender.create({
                    data: {
                        gender_id: catetegories.gender_id,
                        product_id: product.product_id,
                    }
                })
            } else {
                const products_genders = await prisma.products_gender.create({
                    data: {
                        gender_id: genderExist.gender_id,
                        product_id: product.product_id,
                    }
                })
            }
           
        })

        return res.status(201).json({})
    }

    async show(req, res) {
        const { product_id } = req.params

        const id = Number(product_id)
        const product = await prisma.products.findFirst({
            where: {
                product_id: id
            },
            include: {
                Products_price: {
                    include: {
                        country: true
                    }
                },
                Product_plataform: {
                    include: {
                        Plataform: true
                    }
                }
            }
        })

        return res.json(product)
    }
}