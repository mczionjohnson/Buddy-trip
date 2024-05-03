import app from "./server"

app.listen(process.env.PORT, ()=> {
    logger.info("server is running")
})