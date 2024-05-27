import 'dotenv/config'
import jwt from 'jsonwebtoken'

export function signJWT<T>(data: T, expire: any) {
    return jwt.sign({payload: data}, process.env.JWT_TOKEN_SECRET!, {expiresIn: expire})
}

export  async function verifyJWT(token:string, secretKey:string){
    return jwt.verify(token,secretKey)
}