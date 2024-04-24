import vine from "@vinejs/vine";
export const userSchema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
    first_name: vine.string(),
    last_name: vine.string(),
    phone_number: vine.number(),
    referal_code: vine.string()
});
