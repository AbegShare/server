import 'dotenv/config';
import jwt from 'jsonwebtoken';
export function signJwt(data, expireIn) {
    return jwt.sign(data, process.env.JWT_TOKEN_SECRET, expireIn);
}
