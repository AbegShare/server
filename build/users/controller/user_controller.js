/**
 * create a new user
 */
export async function create(req, res, next) {
    const { email, password } = req.body;
    // TODO check if email/user already exist
    // TODO validate user data
    console.log(email);
    // TODO  check if there is a referal code
    // then save to db
}
