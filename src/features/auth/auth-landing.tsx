import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TypographyH1 } from '@/components/typography/typographyH1';
import { TypographyH4 } from '@/components/typography/typographyH4';

export const AuthLanding = () => {
    const navTo = useNavigate();
    return (
        <main className="bg-black min-h-dvh w-full flex justify-center items-center">
            <div className="p-2 flex flex-col text-white">
                <div className="flex flex-col gap-4 mb-10">
                    <TypographyH1 text='X' />
                    <TypographyH1 text='Happening Now' />
                    <TypographyH1 text='Join today.' />
                </div>
                <Button onClick={() => navTo('/register')} className="rounded-3xl w-full bg-[#1d9bf0] p-2">
                    Create Account
                </Button>
                <div className="my-2 text-center">
                    <TypographyH4 text='Already have an account?' />
                </div>
                <Button
                    onClick={() => navTo('/login')}
                    variant="outline"
                    className="rounded-3xl w-full p-2 my-2 text-[#1D9BF0]"
                >
                    Sign In
                </Button>
            </div>
        </main>
    )
}
