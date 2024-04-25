import knex from "knex";
import { v4 as uuidv4 } from 'uuid';
import config from '../../../knexfile.js';
const db = knex(config.development);
export async function createAccount(accountDetails) {
    console.log(config.development);
    const data = {
        id: uuidv4(),
        account_type: accountDetails.account_type,
        account_name: accountDetails.account_name,
        account_plan: accountDetails.account_plan,
        payment_type: accountDetails.payment_type,
        payment_customer_id: accountDetails.payment_customer_id,
        payment_subscription_id: accountDetails.payment_subscription_id,
        payment_method_id: accountDetails.payment_method_id,
    };
    return await db("account").insert(data);
}
