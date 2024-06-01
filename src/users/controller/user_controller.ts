import { NextFunction, Request, Response } from "express"
import { createUser, getUserByEmail } from "../data-access/models/users.js"
import { createAccount } from "../data-access/models/account.js"
import { createOTP, getOTP } from "../data-access/models/opt.js"
import { createUserSchema } from "../data-access/validation/user-validation.js"
import vine, { errors } from "@vinejs/vine"
import transporter from "../../util/email.js"
import { generateUniqueOtp } from "../../util/opt.js"
import { generateUniqueReferralCode } from "../../util/referral.js"
import bcrypt from 'bcrypt'
import { signJWT } from "../../util/jwt.js"


/**
 * create a new user
 */

export async function create(req: Request, res: Response, next: NextFunction) {

    vine.convertEmptyStringsToNull = true

    const data = req.body

    let validatedOutput;

    const validateThisData = {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        role: 'owner'
    }

    try {
        // validate user data
        const validator = vine.compile(createUserSchema)
        validatedOutput = await validator.validate(validateThisData)
        console.log("user details validated successfully")

        // check if email/user already exist
        const doesUserHaveAnEmail = await getUserByEmail(validatedOutput.email)

        if (doesUserHaveAnEmail.length) {
            return res.status(409).json({
                code: '409',
                status: "Conflict",
                message: `email address already in use`,
                data: validateThisData.email
            })
        }

        // create an account in db for user
        const accountCreationResult = await createAccount({
            account_type: 'basic',
            account_name: validatedOutput?.first_name,
            account_plan: 'basic',
            payment_type: 'basic',
        })

        //generate a unique referal code
        const referralCode = await generateUniqueReferralCode(5)

        const userCreationResult = await createUser(validatedOutput, accountCreationResult, referralCode)

        // if user obj is empty, throw an error
        if (!userCreationResult) {
            throw new Error('user maynot have been create, response data is empty')
        }

        // generate an OTP and save to db
        let otp = await generateUniqueOtp(5)

        createOTP(otp, userCreationResult.id!)

        // send email verification
        let mailOptions = {
            from: '"Example Team" <wami@abegshare.com>',
            to: 'wamiikechukwu@gmail.com',
            subject: 'Test Email',
            html: `Test email sent successfully with this token ${otp}`,
        };

        transporter.sendMail(mailOptions)



        return res.status(200).json({
            code: '200',
            status: "OK",
            message: `${userCreationResult.email} created successfully`,
            data: userCreationResult
        })
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).json(error.messages)
            console.log(error.messages)
        } else {
            res.status(500).json(error)
            console.log(error)
        }
    }

}

/**
 * sign in a user
 */
export async function get(req: Request, res: Response, next: NextFunction){

    try {
        const data = req.body

        const isEmailValid = await getUserByEmail(data.email)

        if (!isEmailValid.length) {
            res.status(404).json({
                status:'Error',
                message:'User email not found'
            })
        }

        const getHashedPassword = isEmailValid[0].password

        const comparePassword = bcrypt.compare(data.password, getHashedPassword)

        if(!comparePassword){
            res.status(404).json({
                status:'Error',
                message:'incorrect email or password'
            })
        }

       const token =  signJWT({
            role:isEmailValid[0].role,
            id:isEmailValid[0].id,
        }, '24hr')

        res.status(200).json({
            status: `${data.email} signed in successfully`,
            message: token
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'FAILED', message: `${error}` })
    }

}