import React, { useContext, useEffect } from 'react';
import './Notification.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";

const Notification = () => {
    const { showNotification, setShowNotification, cartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const cartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
        if (cartCount === 0 && showNotification) {
            setShowNotification(false);
        }
    }, [cartItems, showNotification, setShowNotification]);

    if (!showNotification) return null;

    const handleViewAll = () => {
        setShowNotification(false);
        navigate('/cart');
    };

    return (
        <div className="cart-notification">
            <div className="notification-content">
                <div className="notification-body">
                    <p className="added-text">Added To Cart</p>
                    <div className="notification-actions">
                        <button className="view-all-btn" onClick={handleViewAll}>
                            View All
                        </button>
                        <MdClose 
                            className="close-icon" 
                            onClick={() => setShowNotification(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
