import "./InfoModal.css";
import { useEffect } from "react";

export default function InfoModal({
  onClose,
  data: { isOpen, successful, text },
}) {
  const handleClickOverlay = (e) => {
    e.stopPropagation();
  }
  useEffect(() => {
    if (isOpen) {
      const onEscClose = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keyup", onEscClose);
      return () => {
        document.removeEventListener("keyup", onEscClose);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={onClose}
    >
      <div className="modal__container" onClick={handleClickOverlay}>
        <div
          className={`modal__status ${
            successful
              ? "modal__status_success"
              : "modal__status_fail"
          }`}
        ></div>
        <h2 className="modal__title">{text}</h2>
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
