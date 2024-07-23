import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

import "./Modal.css";

const Modal = ({ show, close, content }) => {
  const dialog = useRef();

  useEffect(() => {
    if (show) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [show]);
  return (
    <dialog ref={dialog}>
      <div className="dialog-body">
        <div className="dialog-header">
          {" "}
          <Link onClick={close}>
            <MdOutlineClose />
          </Link>
        </div>
        <div className="dialog-content">{content}</div>
      </div>
    </dialog>
  );
};

export default Modal;
