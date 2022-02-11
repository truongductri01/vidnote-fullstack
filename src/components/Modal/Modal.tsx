import React from "react";

function Modal(props: any) {
  return (
    <div className="Modal fixed top-0 left-0  w-full h-full z-10 flex items-center justify-center">
      <div
        className="ModalBackground opacity-50 -z-10 absolute top-0 left-0 w-full h-full bg-gray-400"
        onClick={props.onClose}
      ></div>
      <div className="ModalContent w-11/12 h-max min-h-[200px] md:w-2/3 rounded-lg p-3 bg-white">
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
