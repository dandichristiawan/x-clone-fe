import React from 'react'

export const useNavbarHooks = () => {
    const [isSticky, setIsSticky] = React.useState<boolean>(false);
    const [showNavbar, setShowNavbar] = React.useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = React.useState<number>(0);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 768) {
                setIsSticky(true);
                return;
            }

            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return { showNavbar, isSticky }
}
