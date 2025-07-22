import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import { useState } from "react";
import AxiosInstance from "../config/axios.config";
import toast from 'react-hot-toast';
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>({
      resolver: yupResolver(registerSchema),
    })
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      setIsLoading(true);
      try {
        const {status} = await AxiosInstance.post('/auth/local/register', data);
        if (status === 200) {
          toast.success('Your Registeration is Done !!', {
            style: {
              backgroundColor: 'black',
              color: 'white',
            }
          });
        }

        setTimeout(() => {
          navigate('/login');
        }, 1500);
        
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
    const renderRegisterInputs = REGISTER_FORM.map(({name, placeholder, type, validation}, idx) => 
      <div key={idx}>
          <Input placeholder={placeholder} type={type} {...register(name, validation)}/>
          {errors[name] && <InputErrorMessage msg={errors[name]?.message}/>}
      </div>
    )

    return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4"  onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterInputs}
        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
