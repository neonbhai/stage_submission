import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {children}
    </div>
  );
};