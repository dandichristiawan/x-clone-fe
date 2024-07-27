import { PostPage } from '@/pages/post/post-page';
import { HomePage } from '@/pages/home/home-page';
import { SignInPage } from '@/pages/auth/signin/sign-in-page';
import { SignUpPage } from '@/pages/auth/signup/sign-up-page';
import { ProfilePage } from '@/pages/profile/profile-page';
import { AuthenticationPage } from '@/pages/auth/authentication-page';
import { Navigate, useRoutes, RouteObject } from 'react-router-dom';

const Routes = () => {
  const route: RouteObject[] = [
    {
      path: '/',
      element: <AuthenticationPage />,
    },
    {
      path: '/register',
      element: <SignUpPage />,
    },
    {
      path: '/login',
      element: <SignInPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '/post/:id',
      element: <PostPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
  ];

  const allRoutes: RouteObject[] = [...route];
  return allRoutes;
};

export default function Router() {
  const useRouter = Routes();
  return useRoutes(useRouter);
}
