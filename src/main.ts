import 'dotenv/config'
import express from 'express'
import router from './users/api/users.js'

const port = process.env.PORT

const app = express()

// middleware to parse json from req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.listen(port, () =>{
    console.log(`app listening on port ${port}`)
})
