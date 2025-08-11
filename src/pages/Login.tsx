import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { LOGIN_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.instance";

interface IFormInput {
    identifier: string;
    password: string;
}

const LoginPage = () => {
    // states
    const [isLoading, setIsLoading] = useState(false);
    // handellrs 
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>({resolver: yupResolver(loginSchema)});
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
            setIsLoading(true);
            try {
                const {status} = await axiosInstance.post("/auth/local/", data);
                if (status === 200) {
                    toast.success(
                        "You will navigate to the Home page after 2 seconds from loggedin.",
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
    

    // render
    const renderLoginForm = LOGIN_FORM.map (({name, placeholder, type, validation}, idx) => (
        <div key={idx}>
            <Input placeholder={placeholder} type={type} {...register(name, validation)}/>
            {errors[name] && <InputErrorMsg msg={errors[name]?.message}/> }
        </div>
    ));

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-4 text-3xl font-semibold">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {renderLoginForm}

                <Button fullWidth isLoading={isLoading}>{isLoading ? "Loading..." : "Login"}</Button>
            </form>
        </div>
    )
}

export default LoginPage;