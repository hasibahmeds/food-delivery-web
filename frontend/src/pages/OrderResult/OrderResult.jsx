import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OrderSuccessModal from "../../components/OrderResultModal/OrderSuccessModal";
import OrderFailModal from "../../components/OrderResultModal/OrderFailModal";
import "./OrderResult.css";

const OrderResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const status = searchParams.get("status"); // "success" or "fail"
  const paymentMethod = searchParams.get("paymentMethod"); // "Online Payment" or "Cash on Delivery"

  const isSuccess = status === "success";

  // If no status param, redirect to home
  useEffect(() => {
    if (!status) {
      navigate("/");
    }
  }, [status, navigate]);

  const handleContinue = () => {
    navigate("/myorders");
  };

  if (!status) return null;

  return (
    <div className="order-result-page">
      {isSuccess ? (
        <OrderSuccessModal paymentMethod={paymentMethod} onContinue={handleContinue} />
      ) : (
        <OrderFailModal paymentMethod={paymentMethod} onContinue={handleContinue} />
      )}
    </div>
  );
};

export default OrderResult;
