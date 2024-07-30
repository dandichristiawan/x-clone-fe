import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TypographyP } from '@/components/typography/typographyP';
import { TypographyH1 } from '@/components/typography/typographyH1';
import { InputWithLabel } from '@/components/InputWithLabel/input-with-label';
import { useLogin } from '@/hooks/authentication';

export const SignIn = () => {
  const navTo = useNavigate();

  const { isLoading, credentials, handleValChange, LoginApi } = useLogin();

  const onLogin = async () => {
    await LoginApi(credentials);
  };

  return (
    <>
      <main className="bg-black min-h-dvh w-full flex justify-center items-center">
        <div className="p-5 flex flex-col gap-4">
          <TypographyH1 text="Sign in to your X account" />
          <InputWithLabel
            label="Email"
            typeProps="email"
            nameProps="email"
            onChange={handleValChange}
            valueProps={credentials.email}
            placeholderProps="johndoe@domain.com"
          />
          <InputWithLabel
            label="Password"
            typeProps="password"
            nameProps="password"
            valueProps={credentials.password}
            onChange={handleValChange}
            placeholderProps="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <Button
            onClick={onLogin}
            className="rounded-3xl w-full p-2 my-2 text-white bg-[#1d9bf0]"
          >
            Login
          </Button>
          <div className="flex flex-row gap-2 items-center">
            <TypographyP text={`Don't have an account?`} />
            <Button
              onClick={() => navTo('/register')}
              variant="link"
              className="text-[#1D9BF0] no-underline p-1"
            >
              Sign up
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
