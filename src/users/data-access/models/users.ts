import { Knex, knex } from 'knex'
import db from "../../../knexfile"
import User from "../interface/user"
import Account from "../interface/account"
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import 'dotenv/config'


/**
 * Create a new user
 */

export async function createUser(userDetails: User, accountDetails: Account) {
    const data: User = {
        id: uuidv4(),
        email: userDetails.email,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        phone_number: userDetails.phone_number,
        role: userDetails.role,
        referal_code: userDetails.referal_code
    }

    // encrypt password
    const salt = await bcrypt.genSalt(13)

    if (typeof userDetails.password === "string") {
        data.password = await bcrypt.hash(userDetails.password, salt)
    }

    // TODO CHECK if data has password
    console.log(`this is data ${data}`)


    // TODO insert into db

    // delete the password from variable
    if(data.password){
        delete data.password
    }

    data.default_account_id = accountDetails.id

    return data

}

