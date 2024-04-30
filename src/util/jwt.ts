import 'dotenv/config'
import jwt from 'jsonwebtoken'

export function signJwt<T>(data:T){

    let i = process.env.JWT_TOKEN_SECRET

    jwt.sign({data}, i!)
}