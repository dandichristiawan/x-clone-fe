import { Home } from '@/features/home/home';
import { MainLayout } from '@/layout/main-layout';

export const HomePage = () => {

  return (
    <>
      <MainLayout>
        <Home />
      </MainLayout>
    </>
  );
};
