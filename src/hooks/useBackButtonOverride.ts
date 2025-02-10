import { useEffect } from 'react';

export const useBackButtonOverride = (callback: () => void) => {
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      callback();
    };

    // Add listener and push state in a single effect
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [callback]);
};