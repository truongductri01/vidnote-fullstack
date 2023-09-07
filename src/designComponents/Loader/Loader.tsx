import React from "react";

const Loader = () => {
    return (
        <div className="Loader absolute top-0 left-0 w-screen h-screen max-w-full z-[10000000] bg-gray-300 opacity-50 flex items-center justify-center">
            <div className="border-[16px] border-gray-100 w-32 h-32 rounded-full border-t-primary animate-spin"></div>
        </div>
    );
};

export default Loader;
