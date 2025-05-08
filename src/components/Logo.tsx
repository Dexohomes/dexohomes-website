
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';

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
        src={logoImage} 
        alt="DexoHomes Logo" 
        className={`${sizeClasses[size]} w-auto`} 
      />
    </Link>
  );
};

export default Logo;
