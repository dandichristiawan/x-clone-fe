import React from 'react';
import { NavbarLeft } from '@/components/Navbar/navbar-left';
import { NavbarRight } from '@/components/Navbar/navbar-right';
type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <NavbarLeft />
      <main className="bg-black min-h-dvh">{children}</main>
      <NavbarRight />
    </>
  );
};
