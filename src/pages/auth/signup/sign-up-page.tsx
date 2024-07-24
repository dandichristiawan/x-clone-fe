import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RegisterApi } from '@/api';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const navTo = useNavigate();
  const [registerCredentials, setRegisterCredentials] = React.useState({
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
  const onRegister = async () => {
    await RegisterApi(registerCredentials);
  };

  return (
    <>
      <main className="bg-black min-h-dvh">
        <div className="p-5 flex flex-col">
          <h1 className="text-white text-2xl">Create your account</h1>
          <Input
            placeholder="Your username"
            className="text-black my-2"
            type="text"
            name="username"
            value={registerCredentials.username}
            onChange={handleValChange}
          />
          <Input
            placeholder="Your e-mail"
            className="text-black my-2"
            type="text"
            name="email"
            value={registerCredentials.email}
            onChange={handleValChange}
          />
          <Input
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            className="text-black my-2"
            type="password"
            name="password"
            value={registerCredentials.password}
            onChange={handleValChange}
          />
          <Button
            onClick={onRegister}
            // variant="default"
            className="rounded-3xl w-full p-2 my-2 text-black bg-white"
          >
            Sign me up
          </Button>
          <h6 className="text-white">
            Already have an account?
            <Button
              onClick={() => navTo('/login')}
              variant="link"
              className="text-[#1D9BF0] no-underline p-1"
            >
              Login
            </Button>
          </h6>
        </div>
      </main>
    </>
  );
};
