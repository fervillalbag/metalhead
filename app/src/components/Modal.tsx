import React from "react";

interface ModalIprops {
  children: React.ReactChild;
  showModal: boolean;
  handleCloseModal: any;
}

const Modal: React.FC<ModalIprops> = ({
  children,
  showModal,
  handleCloseModal,
}) => {
  return (
    <>
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] ${
          showModal ? "block" : "hidden"
        }`}
        onClick={handleCloseModal}
      ></div>
      <div
        className={`fixed top-[50%] left-[50%] translate-x-[-50%] shadow-lg p-2 w-96 px-6 py-10 bg-white rounded-md ${
          showModal ? "translate-y-[-50%]" : "translate-y-[2000px]"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
