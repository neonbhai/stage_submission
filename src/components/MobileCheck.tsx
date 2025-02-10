import React from 'react';
import { Smartphone } from 'lucide-react';

interface MobileCheckProps {
  children: React.ReactNode;
}

export const MobileCheck: React.FC<MobileCheckProps> = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 448);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 448);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
          <Smartphone className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Mobile Only App</h1>
          <p className="text-gray-600">
            This app is only available on mobile platforms. Please open it on your smartphone or tablet.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};