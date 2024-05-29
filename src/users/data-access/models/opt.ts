import knex from "knex";
import { v4 as uuidv4 } from 'uuid'

import config from '../../../knexfile.js'
import 'dotenv/config'

let db = knex(config[process.env.NODE_ENV || 'development']);

export async function createOTP(generatedOTP: string, userId: string) {

    try {
        const data = {
            id: uuidv4(),
            otp_code: generatedOTP,
            user_id: userId
        }

        await db("otp").insert(data);

        return data;

    } catch (error) {
        console.log(error)
        return error
    }


}

export async function getOTP(generatedOTP: string) {

    // try {
        return await db("otp").select().where('otp_code', generatedOTP)

    // } catch (error) {
    //     console.log(error)
    //     return error
    // }

}

