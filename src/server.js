import "express-async-errors"
import express from "express"
import { AppError } from "./utils/AppError.js"
import { router } from "./routes/index.js"
import cors from "cors"

const app = express()
const PORT = 3333
app.use(express.json())
app.use(cors())
app.use(router)

// app.use((error, req, res, next) => {
//     res.header("Access-Control-Allow-Credentials", true)
//     res.header("Access-Control-Allow-Origin", "*"); 
//     res.header("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
//   res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
// //   próximo();
// })

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "Error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        status: "Error",
        message: "Internal server error"
    })
})

app.listen(PORT, () => {
    console.log("Server está rodando na porta 3333")
})


