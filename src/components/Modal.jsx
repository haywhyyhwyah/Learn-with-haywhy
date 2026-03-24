import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3 className="modal-title">{title}</h3>
                <div className="modal-content">{children}</div>
                {/* No default close button, handled by children */}
            </div>
        </div>
    );
};

export default Modal;
