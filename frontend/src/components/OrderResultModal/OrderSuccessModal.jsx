import "./OrderResultModal.css";

const OrderSuccessModal = ({ paymentMethod, onContinue }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content success-modal">
        <div className="modal-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
            <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="modal-title">SUCCESS</h2>
        <p className="modal-message">
          {paymentMethod === "Online Payment" 
            ? "We are delighted to inform you that we received your payment."
            : "We are delighted to inform you that we received your order."
          }
        </p>
        {/* <button className="modal-button continue-btn" onClick={onContinue}> */}
        <button className="modal-button continue-btn-success" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
