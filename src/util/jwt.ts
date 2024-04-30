import 'dotenv/config'
import jwt from 'jsonwebtoken'

export function signJwt<T>(data: T, expireIn: any) {

    return jwt.sign(data , process.env.JWT_TOKEN_SECRET!, expireIn)

}