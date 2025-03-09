import React, { ReactNode } from 'react';

interface PhoneProps {
  children: ReactNode;
  className?: string;
  color?: 'black' | 'white' | 'gold' | 'silver' | 'blue';
}

const Phone: React.FC<PhoneProps> = ({
  children,
  className = '',
  color = 'black',
}) => {
  // Map of colors to their CSS values
  const colorMap = {
    black: 'bg-gray-900',
    white: 'bg-gray-100',
    gold: 'bg-amber-200',
    silver: 'bg-gray-300',
    blue: 'bg-blue-500',
  };

  const phoneColor = colorMap[color];

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: '300px',
        height: '600px',
      }}
    >
      {/* Phone body */}
      <div 
        className={`${phoneColor} rounded-[40px] w-full h-full shadow-xl overflow-hidden border-4 border-gray-800 relative`}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10 flex items-center justify-center">
          {/* Dynamic Island - more modern look */}
          <div className="w-20 h-4 bg-black rounded-full flex items-center">
            {/* Front camera */}
            <div className="absolute right-2 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            
            {/* Speaker */}
            <div className="w-8 h-1 mx-auto bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Screen */}
        <div className="bg-black absolute inset-0 m-1 rounded-[38px] overflow-hidden z-0">
          {/* Content area */}
          <div className="absolute inset-0 pt-8 overflow-hidden">
            {children}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full z-20"></div>
      </div>
    </div>
  );
};

export default Phone;
