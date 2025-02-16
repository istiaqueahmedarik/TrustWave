/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { z } from "zod";
import { post } from "./req";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const signUpSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        present_address: z.string().min(1, "Address is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Invalid phone number"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        dob: z.string().min(1, "Date of birth is required"),
        fathersName: z.string().min(1, "Father's name is required"),
        mothersName: z.string().min(1, "Mother's name is required"),
        nid: z.string().min(1, "NID is required"),
        permanentAddress: z.string().min(1, "Address is required"),
        croppedImage: z.string().min(1, "Cropped image is required"),
        nidImage: z.string().min(1, "NID image is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
export async function SignUp(prevState: any, formData: FormData) {
    const body = signUpSchema.safeParse({
        name: formData.get("name"),
        present_address: formData.get("present_address"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        bloodType: formData.get("bloodType"),
        dob: formData.get("dob"),
        fathersName: formData.get("fathersName"),
        mothersName: formData.get("mothersName"),
        nid: formData.get("nid"),
        permanentAddress: formData.get("permanentAddress"),
        croppedImage: formData.get("croppedImage"),
        nidImage: formData.get("nidImage"),
    });

    try {
        const res = await post('signup', body.data);
        if (res.error) {
            return {
                error: res.error,
            };
        }

    }
    catch (e) {
        return {
            error: "An error occurred. Please try again later.",
        };
    }

    if (!body.success) {
        return {
            error: body.error.issues[0].message,
        };
    }

    redirect("/login");
}


const loginSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });

export async function Login(prevState: any, formData: FormData) {
    const body = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // try {
    //     const res = await post('login', body.data);
    //     if (res.error) {
    //         return {
    //             error: res.error,
    //         };
    //     }


    // }
    // catch (e) {
    //     return {
    //         error: "An error occurred. Please try again later.",
    //     };
    // }
    const res: any = await post('login', body.data)
        .then(async (res) => {
            if (res.error) {
                return {
                    error: res.error,
                };
            }
            return res;

        })
        .catch((e) => {
            return {
                error: "An error occurred. Please try again later.",
            };
        });


    if (!body.success) {
        return {
            error: body.error.issues[0].message,
        };
    }
    console.log(res);

    if (res && res.token) {
        const cookieStore = await cookies();
        cookieStore.set("token", res.token);
    }
    redirect("/dashboard");
}