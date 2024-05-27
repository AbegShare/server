import knex from "knex";
import { v4 as uuidv4 } from 'uuid';
import config from '../../../knexfile.js';
import 'dotenv/config';
let db = knex(config[process.env.NODE_ENV || 'development']);
export async function createOTP(generatedOTP, userId) {
    const data = {
        id: uuidv4(),
        OTP: generatedOTP,
        user_id: userId
    };
    await db("OTP").insert(data);
    return data;
}
