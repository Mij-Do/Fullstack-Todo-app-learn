import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputErrorMsg from "../components/ui/InputErrorMsg";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const RegisterPage = () => {

    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input placeholder="User Name" {...register("username", {required: true, minLength: 5, maxLength: 20})}/>
                    {errors?.username && errors?.username.type === "required" && <InputErrorMsg msg="UserName Is Required!"/>}
                    {errors?.username && errors?.username.type === "minLength" && <InputErrorMsg msg="UserName should be more than 5 characters!"/>}
                    {errors?.username && errors?.username.type === "maxLength" && <InputErrorMsg msg="UserName should be less than 20 characters!"/>}
                </div>
                <div>
                    <Input placeholder="Email Address" {...register("email", {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})}/>
                    {errors?.email && errors?.email.type === "required" && <InputErrorMsg msg="Email Is Required!"/>}
                    {errors?.email && errors?.email.type === "pattern" && <InputErrorMsg msg="Email Is not Valid!"/>}
                </div>
                <div>
                    <Input placeholder="Password" {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, minLength: 8,})}/>
                    {errors?.password && errors?.password.type === "required" && <InputErrorMsg msg="Password Is Required!"/>}
                    {errors?.password && errors?.password.type === "pattern" && <InputErrorMsg msg="Password is Weak!"/>}
                    {errors?.password && errors?.password.type === "minLength" && <InputErrorMsg msg="Password should be more than 8 characters!"/>}
                </div>

                <Button fullWidth>Register</Button>
            </form>
        </div>
    )
}

export default RegisterPage;