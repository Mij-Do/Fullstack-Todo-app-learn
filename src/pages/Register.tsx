import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { REGISTER_FORM } from "../data";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.instance";
import { useState } from "react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    // states
    const [isLoading, setIsLoading] = useState(false);

    // Handellers
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>({resolver: yupResolver(registerSchema)})
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true);
        try {
            const {status} = await axiosInstance.post("/auth/local/register", data);
            if (status === 200) {
                toast.success(
                    "You will navigate to the login page after 2 seconds to login.",
                    {
                        position: "bottom-center",
                        duration: 1500,
                        style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                        },
                    }
                )};
        } catch (error) {
            const errObj = error as AxiosError<IErrorResponse>;
            toast.error (`${errObj.response?.data.error.message}`,
                {
                    position: "bottom-center",
                    duration: 1500,
                    style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                    },
                }
            );
        } finally {
            setIsLoading(false);
        }
    }

    // Renders
    const renderRegisterForm = REGISTER_FORM.map (({name, placeholder, type, validation}, idx) => (
            <div key={idx}>
                <Input placeholder={placeholder} type={type} {...register(name, validation)}/>
                {errors[name] && <InputErrorMsg msg={errors[name]?.message}/> }
            </div>
        ));

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {renderRegisterForm}

                <Button fullWidth isLoading={isLoading}>{isLoading ? "Loading..." : "Register"}</Button>
            </form>
        </div>
    )
}

export default RegisterPage;