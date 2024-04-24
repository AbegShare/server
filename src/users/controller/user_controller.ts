import { NextFunction, Request, Response } from "express"
import { createUser } from "../data-access/models/users.js"
import { createAccount } from "../data-access/models/account.js"
import { userSchema } from "../data-access/validation/user-validation.js"
import vine, {errors} from "@vinejs/vine"

/**
 * create a new user
 */

export async function create(req:Request, res:Response, next: NextFunction){

    vine.convertEmptyStringsToNull = true

    const data = req.body

    let output;

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
        output = await validator.validate(validateThisData)
        console.log("user details validated successfully")
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).json(error.messages)
            console.log(error.messages)
          }
    }

    // TODO create an account in db for user
    createAccount({
        account_type: 'basic',
        account_name: output?.first_name,
        account_plan: 'basic',
        payment_type: 'basic',
    })

    // TODO  check if there is a referal code


    // then save to db
    // createUser(output)



}