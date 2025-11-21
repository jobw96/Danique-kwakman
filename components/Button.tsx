import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = true,
  className = '',
  ...props 
}) => {
  // rounded-md, soft shadow, specific palette colors
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md";
  
  const variants = {
    // Primary: Accent 2 (#9CAAC6) BG, White Text. Hover: Darker Accent 2
    primary: "bg-[#9CAAC6] text-white hover:bg-[#8A98B0] border border-[#9CAAC6]",
    
    // Outline: Border Accent 2 (#9CAAC6), Text Accent 2 (#9CAAC6) or Heading Color (#1D1D1B). 
    // Using #9CAAC6 for border as requested.
    outline: "bg-transparent text-[#1D1D1B] border border-[#9CAAC6] hover:bg-[#9CAAC6] hover:text-white",
    
    // White: White BG, Text Accent 2 (#9CAAC6)
    white: "bg-white text-[#9CAAC6] hover:bg-[#FCF9F2] border border-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon && <ArrowUpRight className="w-4 h-4" />}
    </button>
  );
};