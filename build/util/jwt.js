import 'dotenv/config';
import jwt from 'jsonwebtoken';
export function signJwt(data) {
    let i = process.env.JWT_TOKEN_SECRET;
    jwt.sign({ data }, i);
}
