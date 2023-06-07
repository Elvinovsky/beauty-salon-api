import { startServer } from "./app";
import { runDB } from "./db/runDb";

const startApp = async () => {
        startServer()
        await runDB()
}

startApp()
    .then (() => {
        console.log('app started')
    })
    .catch((err) => {
        console.error('error startApp',err)
})