import React from "react";

const toastStyles = {
  success: {},
};

function Toast() {
  return (
    <div className="Toast w-3/5 h-20 rounded-md border-2 border-green-500 bg-gray-100 absolute top-2 right-2 flex flex-col justify-center py-1 px-2 z-50">
      <div className="Signal h-6 flex-shrink-0 flex items-center border-b-2 border-gray-500">
        <div className="bg-green-500 w-4 h-4 rounded-md mr-2"></div>
        Success
      </div>
      <div className="Content flex-grow">Data is saved</div>
    </div>
  );
}

export default Toast;
