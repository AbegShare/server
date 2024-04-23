 interface Account {
    id: string,
    account_type: string,
    account_name: string,
    account_plan: string,
    payment_type: string,
    payment_customer_id: string,
    payment_subscription_id: string,
    payment_method_id: string,
    created_at: string,
    modified_at:string,
    last_active_at:string
}

export default Account
