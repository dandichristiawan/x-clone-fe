import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from '@radix-ui/react-toast';

interface FormDataLogin {
  email: string;
  password: string;
}

interface FormDataRegister {
  email: string;
  username: string;
  password: string;
}

export const useLogin = () => {
  const navTo = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
  });
  const handleValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function LoginApi(formData: FormDataLogin) {
    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.103.56:3000/api/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      Cookies.set('token', data.token, { expires: 1 / 24 });
      Cookies.set('userId', data.user.id, { expires: 1 / 24 });
      Cookies.set('fullname', data.user.fullname, { expires: 1 / 24 });
      Cookies.set('username', data.user.username, { expires: 1 / 24 });
      Cookies.set('following', data.user.following, { expires: 1 / 24 });
      Cookies.set('followers', data.user.followers, { expires: 1 / 24 });
      setIsLoading(false);
      navTo('/home');
    } catch (error) {
      console.error(error);
    }
  }

  return { credentials, handleValChange, LoginApi, isLoading };
};

export const useRegister = () => {
  const navTo = useNavigate();
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [registerCredentials, setRegisterCredentials] = React.useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function RegisterApi(formData: FormDataRegister): Promise<void> {
    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.103.56:3000/api/signup', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      setIsLoading(false);
      toast({
        title: "Your account have been successfully created!",
        action: <ToastAction
          altText='Login'
          onClick={() => navTo('/login')}
          className='bg-white text-black font-bold rounded-3xl p-2 w-3/12'
        >
          Login
        </ToastAction>,
        className: "bg-[#1d9bf0] border-none rounded-lg text-white",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    isLoading,
    registerCredentials,
    handleValChange,
    RegisterApi,
  };
};
