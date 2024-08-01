import { useRoutes, RouteObject } from 'react-router-dom';
import { PostPage } from '@/pages/post/post-page';
import { HomePage } from '@/pages/home/home-page';
import { ProfilePage } from '@/pages/profile/profile-page';
import { SignInPage } from '@/pages/auth/signin/sign-in-page';
import { SignUpPage } from '@/pages/auth/signup/sign-up-page';
import { AuthenticationPage } from '@/pages/auth/authentication-page';
import { CreatePostMobilePage } from '@/pages/create-post-mobile/create-post-page';

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
      path: '/create-post/mobile',
      element: <CreatePostMobilePage />
    },
    {
      path: '/user/:username',
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
