import knex from 'knex'
import config from "../../../knexfile.js"
import User from "../interface/user"
import Account from "../interface/account"
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import 'dotenv/config'


/**
 * Create a new user
 */

let db = knex(config[process.env.NODE_ENV || 'development']);

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

    function passwordToString(): string {
        const isPasswordString = userDetails.password

        if (typeof isPasswordString !== 'string') {
            throw new Error('user password is either empty or undefined')
        }

        return isPasswordString

    }
    // encrypt password
    const salt = await bcrypt.genSalt(13)
    data.password = await bcrypt.hash(passwordToString(), salt)

    // set the account id
    data.default_account_id = accountDetails.id

    // insert into db
    await db("user").insert(data);

    // delete the password from variable
    if (data.password) {
        delete data.password
    }

    return data

}

