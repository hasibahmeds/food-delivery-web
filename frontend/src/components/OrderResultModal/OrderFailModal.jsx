import "./OrderResultModal.css";

const OrderFailModal = ({ paymentMethod, onContinue }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content fail-modal">
        <div className="modal-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#F44336"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="modal-title">FAIL</h2>
        <p className="modal-message">
          {paymentMethod === "Online Payment" 
            ? "Unfortunately we have an issue with your payment, try again later."
            : "Unfortunately we have an issue with your order, try again later."
          }
        </p>
        {/* <button className="modal-button continue-btn" onClick={onContinue}> */}
        <button className="modal-button continue-btn-fail" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrderFailModal;
