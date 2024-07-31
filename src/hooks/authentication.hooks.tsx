import React from 'react';
import { toast } from "sonner"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
      setIsLoading(false);
      navTo('/home');
    } catch (error) {
      console.error(error);
    }
  }

  return { credentials, handleValChange, LoginApi, isLoading };
};

export const useRegister = () => {
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
      toast("Your account has been successfully created.")
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
