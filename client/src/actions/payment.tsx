/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { redirect } from "next/navigation";
import { post_with_token } from "./req";

export async function Payment(prevState: any, formData: FormData) {
    const body = {
        phoneNumber: formData.get("phoneNumber"),
        amount: formData.get("amount"),
        reference: formData.get("reference"),
    }
    console.log(body);
    const res = await post_with_token('payment/auth/pay', body)
        .then(async (res) => {
            if (res.error) {
                return {
                    error: res.error,
                };
            }
            console.log(res);
            return res;

        })
        .catch((e) => {
            return {
                error: "An error occurred. Please try again later.",
            };
        });
    redirect("/dashboard");

}