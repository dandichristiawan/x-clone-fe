import React from 'react';
import { Button } from '@/components/ui/button';
import { RegisterApi } from '@/api';
import { useNavigate } from 'react-router-dom';
import { TypographyP } from '@/components/typography/typographyP';
import { TypographyH1 } from '@/components/typography/typographyH1';
import { InputWithLabel } from '@/components/InputWithLabel/input-with-label';

export const SignUp = () => {

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
            <main className="bg-black min-h-dvh w-full flex justify-center items-center">
                <div className="p-5 flex flex-col gap-4">
                    <TypographyH1 text='Create your account' />
                    <InputWithLabel
                        label='Username'
                        typeProps="text"
                        nameProps="username"
                        onChange={handleValChange}
                        valueProps={registerCredentials.username}
                        placeholderProps="Your username"
                    />
                    <InputWithLabel
                        label='Email'
                        typeProps='email'
                        nameProps='email'
                        onChange={handleValChange}
                        valueProps={registerCredentials.email}
                        placeholderProps='Your e-mail'
                    />
                    <InputWithLabel
                        label='Password'
                        typeProps='password'
                        nameProps='password'
                        valueProps={registerCredentials.password}
                        onChange={handleValChange}
                        placeholderProps='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                    />
                    <Button
                        onClick={onRegister}
                        className="rounded-3xl w-full p-2 my-2 text-white bg-[#1d9bf0]"
                    >
                        Sign me up
                    </Button>
                    <div className="flex flex-row gap-2 items-center">
                        <TypographyP text='Already have an account?' />
                        <Button
                            onClick={() => navTo('/login')}
                            variant="link"
                            className="text-[#1D9BF0] no-underline p-1"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </main >
        </>
    )
}
