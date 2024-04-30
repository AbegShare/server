import { createUser } from "../data-access/models/users.js";
import { createAccount } from "../data-access/models/account.js";
import { userSchema } from "../data-access/validation/user-validation.js";
import vine, { errors } from "@vinejs/vine";
import { signJwt } from "../../util/jwt.js";
/**
 * create a new user
 */
export async function create(req, res, next) {
    vine.convertEmptyStringsToNull = true;
    const data = req.body;
    let validatedOutput;
    const validateThisData = {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        referal_code: data.referal_code,
        role: 'owner'
    };
    // TODO check if email/user already exist
    try {
        // validate user data
        const validator = vine.compile(userSchema);
        validatedOutput = await validator.validate(validateThisData);
        console.log("user details validated successfully");
        // create an account in db for user
        const accountCreationResult = await createAccount({
            account_type: 'basic',
            account_name: validatedOutput?.first_name,
            account_plan: 'basic',
            payment_type: 'basic',
        });
        // TODO  check if there is a referal code
        const userCreationResult = await createUser(validatedOutput, accountCreationResult);
        // TODO send email verification
        const i = signJwt({
            name: "test"
        }, '30min');
        console.log(i);
        res.status(200).json({
            status: "OK",
            message: `${userCreationResult.email} created successfully`,
            data: userCreationResult
        });
    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).json(error.messages);
            console.log(error.messages);
        }
        else {
            res.status(500).json(error);
            console.log(error);
        }
    }
}
