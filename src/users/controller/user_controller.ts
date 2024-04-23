import { NextFunction, Request, Response } from "express"
import { createUser } from "../data-access/models/users"
/**
 * create a new user
 */

export async function create(req:Request, res:Response, next: NextFunction){

    const {email, password} = req.body

    // TODO check if email/user already exist


    // TODO validate user data
    console.log(email)



    // TODO  check if there is a referal code
    // then save to db



}