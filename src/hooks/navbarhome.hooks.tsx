import React from 'react';

export const useNavbarHooks = () => {
  const [isSticky, setIsSticky] = React.useState<boolean>(false);
  const [showNavbar, setShowNavbar] = React.useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = React.useState<number>(0);
  const [hideTimeout, setHideTimeout] = React.useState<NodeJS.Timeout | null>(
    null
  );

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const currentScrollY = window.scrollY;

        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }

        if (currentScrollY > lastScrollY) {
          setHideTimeout(setTimeout(() => setShowNavbar(false), 100));
        } else {
          setShowNavbar(true);
        }

        setLastScrollY(currentScrollY);
      }

      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [lastScrollY, hideTimeout]);

  return { showNavbar, isSticky };
};
