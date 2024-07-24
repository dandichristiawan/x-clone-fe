import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';


export const AuthenticationPage = () => {
  const navTo = useNavigate();

  return (
    <main className="bg-black min-h-dvh">
      <div className="p-5 flex flex-col text-white">
        <h1>X</h1>
        <h1 className="text-2xl">Happening Now</h1>
        <h6 className="text-xl">Join today.</h6>
        <Button onClick={() => navTo('/register')} className="rounded-3xl w-full bg-[#1d9bf0] p-2">
          Create Account
        </Button>
        <h6 className='mt-2'>Already have an account?</h6>
        <Button
          onClick={() => navTo('/login')}
          variant="outline"
          className="rounded-3xl w-full p-2 my-2 text-[#1D9BF0]"
        >
          Sign In
        </Button>
      </div>
    </main>
  );
};
