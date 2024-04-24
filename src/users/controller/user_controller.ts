import { NextFunction, Request, Response } from "express"
import { createUser } from "../data-access/models/users.js"
import { userSchema } from "../data-access/validation/user-validation.js"
import vine, {errors} from "@vinejs/vine"
/**
 * create a new user
 */

export async function create(req:Request, res:Response, next: NextFunction){

    vine.convertEmptyStringsToNull = true

    const data = req.body

    const validateThisData = {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        referal_code: data.referal_code,
    }

    // TODO check if email/user already exist


    // validate user data
    try {
        const validator = vine.compile(userSchema)
        const output = await validator.validate(validateThisData)
        res.status(200).json(output)
        console.log(output)
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).json(error.messages)
            console.log(error.messages)
          }
    }


    // TODO  check if there is a referal code


    // then save to db
    // createUser(req.body)



}