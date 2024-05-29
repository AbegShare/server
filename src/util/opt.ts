import { getOTP } from "../users/data-access/models/opt.js";

function generateRandomNum(length: number) {
    const digit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    let randomNum = '';

    for (let i = 0; i < length; i++) {
        randomNum += Math.floor(Math.random() * digit.length).toString()
    }

    return randomNum
}

async function doesOtpExist(otp: string) {
    const data = await getOTP(otp);

    if (data.length > 0) {
        return true
    } else {
        return false
    }
}

export async function generateUniqueOtp(length: number) {
    const isOtpUnique = await doesOtpExist(generateRandomNum(length))

    if (isOtpUnique) {
        return generateUniqueOtp(length)
    }

    console.log(`this is the unique string ${isOtpUnique}`)

    return generateRandomNum(length)
}

