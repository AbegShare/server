import { getUserByReferralCode } from "../users/data-access/models/users.js";

function generateReferralCode(length: number): string {
    const characters: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result: string = '';
    for (let i = 0; i < length; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

async function isReferralCodeUnique(referralCode: string) {
    const data = await getUserByReferralCode(referralCode);

    if (!data.length) {
        return true
    } else {
        return false
    }
}

export async function generateUniqueReferralCode(length: number) {

    const result = await isReferralCodeUnique(generateReferralCode(length))


    if (!result) {
        generateUniqueReferralCode(length)
    }

    return generateReferralCode(length)
}