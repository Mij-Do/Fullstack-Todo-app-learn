import * as yup from "yup";

export const registerSchema = yup
    .object({
        username: yup.string()
        .required("User Name is Required!")
        .min(5, "User Name should be mre than 5 characters!"),
        email: yup.string()
        .required("Email is Required!")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not Valid!"),
        password: yup.string()
        .required("Password is Required!")
        .min(8, "Password should be more than 8 characters!")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password Is Weak!")
    })
    .required();