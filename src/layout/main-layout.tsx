import React from 'react';
import { NavbarLeft } from '@/components/Navbar/NavbarLeft';
import { NavbarRight } from '@/components/Navbar/NavbarRight';

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <NavbarLeft />
      <div className="flex justify-center items-center min-h-screen">
        {children}
      </div>
      <NavbarRight />
    </>
  );
};
