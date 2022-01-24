import React from "react";

interface ModalIprops {
  children: React.ReactChild;
  showModal: boolean;
}

const Modal: React.FC<ModalIprops> = ({ children, showModal }) => {
  return (
    <div
      className={`fixed top-[50%] left-[50%] translate-x-[-50%] border p-2 w-64 h-72 bg-white ${
        showModal ? "translate-y-[-50%]" : "translate-y-[2000px]"
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
