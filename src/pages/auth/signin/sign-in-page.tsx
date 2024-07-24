import React from 'react'
import { LoginApi } from '@/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';


export const SignInPage = () => {

    const navTo = useNavigate();
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
        <>
            <main className='bg-black min-h-dvh'>
                <div className="p-5 flex flex-col">
                    <h1 className='text-white text-2xl'>Sign in to X</h1>
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
                        // variant="default"
                        className='rounded-3xl w-full p-2 my-2 text-black bg-white'
                    >
                        Login
                    </Button>
                    <h6 className='text-white'>Don't have an account?
                        <Button
                            onClick={() => navTo('/register')}
                            variant="link"
                            className='text-[#1D9BF0] no-underline p-1'
                        >
                            Sign up
                        </Button>
                    </h6>
                </div>
            </main>
        </>
    )
}
