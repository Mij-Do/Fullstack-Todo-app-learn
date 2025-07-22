import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import AxiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";


interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      setIsLoading(true);
      try {
        const {status} = await AxiosInstance.post('/auth/local/', data);
        if (status === 200) {
          toast.success('Your Login is Done !!', {
            style: {
              backgroundColor: 'black',
              color: 'white',
            }
          });
        }
      } catch (error) {
        const errObj = error as AxiosError<IErrorResponse>;
        toast.error(`${errObj.response?.data.error.message}`, {
            style: {
              backgroundColor: 'black',
              color: 'white',
            }
          });
      } finally {
        setIsLoading(false);
      }
    }

    // Render
    const renderLoginForm = LOGIN_FORM.map(({name, placeholder, type, validation}, idx) => 
      <div key={idx}>
          <Input placeholder={placeholder} type={type} {...register(name, validation)}/>
          {errors[name] && <InputErrorMessage msg={errors[name]?.message}/>}
      </div>
    )


  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}

        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;

