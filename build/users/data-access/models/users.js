import knex from 'knex';
import config from "../../../knexfile.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import 'dotenv/config';
/**
 * Create a new user
 */
let db = knex(config[process.env.NODE_ENV || 'development']);
export async function createUser(userDetails, accountDetails) {
    const data = {
        id: uuidv4(),
        email: userDetails.email,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        phone_number: userDetails.phone_number,
        role: userDetails.role,
        referal_code: userDetails.referal_code
    };
    function passwordToString() {
        const isPasswordString = userDetails.password;
        if (typeof isPasswordString !== 'string') {
            throw new Error('user password is either empty or undefined');
        }
        return isPasswordString;
    }
    // encrypt password
    const salt = await bcrypt.genSalt(13);
    data.password = await bcrypt.hash(passwordToString(), salt);
    // insert into db
    // await db("user").insert(data);
    // delete the password from variable
    if (data.password) {
        delete data.password;
    }
    data.default_account_id = accountDetails.id;
    return data;
}
