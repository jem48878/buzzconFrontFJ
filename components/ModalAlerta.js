import React from 'react';

export default function ModalAlert({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          max-width: 400px;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          color: black;
        }
        button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
        }
      `}</style>
    </div>
  );
}
