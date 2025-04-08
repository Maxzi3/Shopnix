import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../Hooks/useOutsideClick";

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);
  const isOpen = Boolean(openName);

  return (
    <ModalContext.Provider value={{ openName, close, open, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const modalRef = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-8 animate-fadeIn"
        tabIndex="-1"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 p-2 rounded"
        >
          <HiXMark className="w-6 h-6" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
