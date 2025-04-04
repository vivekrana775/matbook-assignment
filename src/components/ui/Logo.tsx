
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-white rounded-full p-2 shadow-md">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM30 27.5C30 28.88 28.88 30 27.5 30H12.5C11.12 30 10 28.88 10 27.5V12.5C10 11.12 11.12 10 12.5 10H27.5C28.88 10 30 11.12 30 12.5V27.5Z"
            fill="#4B8F41"
          />
          <path
            d="M22.5 15H17.5V25H22.5V15Z"
            fill="#4B8F41"
          />
          <path
            d="M15 17.5V22.5H25V17.5H15Z"
            fill="#4B8F41"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-white text-2xl font-bold leading-tight">HighBridge</span>
        <span className="text-green-200 text-xs font-medium">SUSTAINABILITY PLATFORM</span>
      </div>
    </div>
  );
};

export default Logo;
