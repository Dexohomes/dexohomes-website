
import React from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/7e87ca7d-ce98-4078-b97f-704943d36e26.png" 
        alt="DexoHomes Logo" 
        className={`${sizeClasses[size]} w-auto`} 
      />
    </Link>
  );
};

export default Logo;
