import React from 'react';

export const useNavbarHooks = () => {
  const [isSticky, setIsSticky] = React.useState<boolean>(false);
  const [showNavbar, setShowNavbar] = React.useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = React.useState<number>(0);
  const [hideTimeout, setHideTimeout] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false); // Add this state

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const currentScrollY = window.scrollY;

        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }

        // Check if the scroll is significant (e.g., greater than 100px) and handle pull-to-refresh
        if (currentScrollY > lastScrollY) {
          if (currentScrollY < 100) {
            // Adjust the threshold if needed
            setIsRefreshing(true); // Set flag when pull-to-refresh is detected
            setShowNavbar(true); // Ensure navbar remains visible
          } else {
            setIsRefreshing(false); // Reset flag when normal scrolling
            setHideTimeout(setTimeout(() => setShowNavbar(false), 100));
          }
        } else {
          setIsRefreshing(false);
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

  return { showNavbar, isSticky, isRefreshing };
};
