import React from "react";

const TooltipDialog = () => {
  return (
    <div className="relative inline-block">
      {/* Tooltip Container */}
      <div className="absolute top-0 left-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg p-3">
        {/* Tooltip Arrow */}
        <div className="absolute -top-2 left-3 w-4 h-4 rotate-45 bg-white border-l border-t border-gray-300"></div>

        {/* Buttons Inside Tooltip */}
        <div className="grid grid-cols-2 gap-2">
          <button className="border border-gray-300 px-3 py-1 rounded-md text-sm">
            API Call
          </button>
          <button className="border border-gray-300 px-3 py-1 rounded-md text-sm">
            Email
          </button>
          <button className="border border-gray-300 px-3 py-1 rounded-md text-sm col-span-2">
            Text Box
          </button>
        </div>
      </div>
    </div>
  );
};

export default TooltipDialog;
