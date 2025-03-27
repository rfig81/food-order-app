import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}
function Modal({ open, onClose, children, className }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;

    if (open) modal?.showModal();

    return () => modal?.close();
  }, [open]);

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
