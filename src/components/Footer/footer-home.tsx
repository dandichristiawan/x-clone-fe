import React from "react"
import home from '@/assets/home.svg'
import search from '@/assets/search.svg'
import message from '@/assets/message.svg'
import notification from '@/assets/notification.svg'
import Cookies from "js-cookie"

export const FooterHome = () => {

    const isTokenExist = Cookies.get('token')

    const [opacity, setOpacity] = React.useState<number>(0)

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(1 - scrollY / 300, 0.5);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isTokenExist) return null

    if (isTokenExist) {
        return (
            <>
                <footer
                    className='sticky bottom-0 items-centertext-white bg-black h-12 w-full border border-gray-600 md:hidden'
                    style={{ opacity }}
                >
                    <div className="flex flex-row items-center justify-evenly gap-2 p-1">
                        <img src={home} alt="" width={30} height={30} />
                        <img src={search} alt="" width={40} height={40} />
                        <img src={notification} alt="" width={30} height={30} />
                        <img src={message} alt="" width={30} height={30} />
                    </div>
                </footer>
            </>
        )
    }
}
