// yup validation
import * as yup from "yup";

export const registerSchema = yup
    .object({
        username: yup.string()
        .required("User Name is Required!")
        .min(5, "User Name should have mre than 5 characters!"),
        email: yup.string()
        .required("Email is Required!")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not Valid!"),
        password: yup.string()
        .required("Password is Required!")
        .min(6, "Password should have more than 8 characters!")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password Is Weak!")
    })
    .required();

export const loginSchema = yup
.object({
    identifier: yup.string()
    .required("Email is Required!")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not Valid!"),
    password: yup.string()
    .required("Password is Required!")
    .min(6, "Password should have more than 6 characters!")
})
.required();


export const updateTodosInputs = yup
    .object({
        title: yup.string()
        .required("Title is Required!")
        .min(5, "Title should have more than 5 characters!"),
        description: yup.string()
        .required("Description is Required!")
        .min(10, "Description should have more than 10 characters!")
    })
    .required();


// old validation

export const updateInputValidation = (
    inputs: {
        title: string, 
        description: string,
    }) => {
    const errors = {
        title: '',
        description: '',
    }

    if (!inputs.title.trim() || inputs.title.length < 5 || inputs.title.length > 20) {
        errors.title = 'TheTitle characters should have more than 5 && less than 20!';
    }
    if (!inputs.description.trim() || inputs.description.length < 10 || inputs.description.length > 90) {
        errors.description = 'The Description characters should have more than 10 && less than 90!';
    }

    return errors;
}