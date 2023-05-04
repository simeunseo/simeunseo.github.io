import ReactDom from "react-dom";
import { ReactNode } from "react";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal-root");
  return ReactDom.createPortal(children, el);
};

export default ModalPortal;
