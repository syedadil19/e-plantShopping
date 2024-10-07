import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + parseFloat(item.cost.replace('$', '')) * item.quantity, 0).toFixed(2);
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        return (item.cost.replace('$', '')) * item.quantity;
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem({ name: item.name }));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem({ name: item.name }));
    };

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Get total item count

    return (
        <div className="cart-container">
            <div className="cart-icon-with-count">
                <svg className="cart-icon" /* SVG Path here */ viewBox="0 0 24 24">
                    {/* Insert your SVG path data here */}
                </svg>
                <span className="item-count">{totalItems}</span> {/* Item count display */}
            </div>
            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={() => alert('Checkout functionality will be added in future updates.')}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;