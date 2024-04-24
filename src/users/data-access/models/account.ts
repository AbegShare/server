import knex from "knex";
import { v4 as uuidv4 } from 'uuid'
import Account from "../interface/account";
import db from '../knexfile.js'


export async function createAccount(accountDetails: Account) {

    knex(db)

    const data: Account = {
        id: uuidv4(),
        account_type: accountDetails.account_type,
        account_name: accountDetails.account_name,
        account_plan: accountDetails.account_plan,
        payment_type: accountDetails.payment_type,
        payment_customer_id: accountDetails.payment_customer_id,
        payment_subscription_id: accountDetails.payment_subscription_id,
        payment_method_id: accountDetails.payment_method_id,
    }

    return await knex("account").insert(data)

}