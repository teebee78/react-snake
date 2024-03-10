import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, children, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal?.showModal();
    }
    return () => { console.log('closing'); modal?.close()};
  }, [open]);

  //  return <dialog ref={dialogRef} >{children}</dialog>;

  return createPortal(
    <dialog ref={dialogRef} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
