import express, {Request, Response} from "express";
import cookieParser from "cookie-parser"
import { RecordsRouter } from "../src/routers/records-router";
import { ServicesRouter } from "../src/routers/services-router";

const app = express()

app.use(express.json())
app.use(cookieParser())

app.set('trust proxy', true)
app.get('/', ( req:Request, res:Response) => {
    const ipAddress = req.ip
    res.send({ipAddress})
})
app.use('/sugar', ServicesRouter)

const startServer = () => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

export { app, startServer }