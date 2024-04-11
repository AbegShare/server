import 'dotenv/config'
import express from 'express'

const port = process.env.PORT

const app = express()

app.listen(port, () =>{
    console.log(`app listening on port ${port}`)
})



