interface User {
    id?: string,
    email: string,
    password?: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    created_at?: string,
    modified_at?: string,
    last_login?: string,
    role?: string,
    verified?: boolean,
    avatar_url?: string,
    user_disabled?: boolean,
    referal_code?: string,
    default_account_id?: string
}



export default User