import Cookies from 'js-cookie';
import { Home } from '@/features/home/home';
import { FloatingButton } from '@/components/FloatingButton/floating-button';

export const HomePage = () => {
  const isTokenExist = Cookies.get('token')

  return (
    <>
      <Home />
      {isTokenExist && (
        <FloatingButton />
      )}
    </>
  );
};
