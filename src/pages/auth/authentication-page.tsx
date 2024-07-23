import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginApi } from '@/api';

export const AuthenticationPage = () => {
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

  const onLogin = async () => {
    await LoginApi(credentials);
  };

  return (
    <main className="bg-black min-h-dvh">
      <div className="p-5 flex flex-col text-white">
        <h1>X</h1>
        <h1 className="text-2xl">Happening Now</h1>
        <h6 className="text-xl">Join today.</h6>
        <Button className="rounded-3xl w-full bg-[#1d9bf0] p-2">
          Create Account
        </Button>
        <h6>Already have an account?</h6>
        <Input
          placeholder="johndoe@domain.com"
          className="text-black my-2"
          type="text"
          value={credentials.email}
          name="email"
          onChange={handleValChange}
        />
        <Input
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          className="text-black"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleValChange}
        />
        <Button
          onClick={onLogin}
          variant="outline"
          className="rounded-3xl w-full p-2 my-2 text-[#1D9BF0]"
        >
          Sign In
        </Button>
      </div>
    </main>
  );
};
