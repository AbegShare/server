import express, {application, request, response}from 'express'
import {create} from '../controller/user_controller.js'

const router = express.Router()

// create users
router.post('/signup', (req , res, next) =>{
    create(req, res, next )
})

export default router