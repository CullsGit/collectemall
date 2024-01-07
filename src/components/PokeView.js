import "./PokeView.css";
import { useEffect } from "react";

const PokeView = ({ pokemon, closeModal, isClosing }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  return (
    <div className="modal">
      <div className={`modal-content ${isClosing ? "closing" : ""}`}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{pokemon.name}</h2>
      </div>
    </div>
  );
};

export default PokeView;
