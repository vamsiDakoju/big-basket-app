import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearCart, DecCart, IncCart, OrderDetails, RemoveFromCart } from './store';
import './Cart.css';
import { Navigate, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

function Cart() {
    const dispatch = useDispatch();
    const cartObjects = useSelector(globalState => globalState.cart);
    const [discount, setDiscount] = useState(0);

    const [couponCode, setCouponCode] = useState('');
    const couponCodeRef = useRef();

    const Navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('upi');


    const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);

    const listItems = cartObjects.map((product, index) => (
        <li key={index}>
            <img src={product.image} alt={product.name} />
            <div className="cart-details">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
            </div>
            <div className="cart-actions">
                <button onClick={() => dispatch(IncCart(product))} style={{ color: 'white', backgroundColor: '#e67e22', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '18px' }}>+</button>
                <p>{product.quantity}</p>
                <button onClick={() => dispatch(DecCart(product))} style={{ color: 'white', backgroundColor: '#f39c12', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '18px' }}>-</button>
                <button onClick={() => dispatch(RemoveFromCart(product))} style={{ color: 'white', backgroundColor: '#e74c3c', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '18px' }}>Remove</button>
            </div>
        </li>
    ));


    //calculating total amount by taking arrow function

    const calculatingAmount = () => {
        let totalPrice = cartObjects.reduce((total, item) => total + item.price * item.quantity, 0);
        let calDiscount = (totalPrice * discount) / 100;    //reading from useState() variable
        let priceAfterDiscount = totalPrice - calDiscount;
        let couponDiscount = (couponDiscountPercentage / 100) * priceAfterDiscount;
        let afterDiscount = priceAfterDiscount - couponDiscount
        let taxPrice = (afterDiscount * 17) / 100;
        let finalPrice = afterDiscount + taxPrice;
        return { totalPrice, priceAfterDiscount, taxPrice, afterDiscount, finalPrice };
    };

    const { totalPrice, priceAfterDiscount, afterDiscount, taxPrice, finalPrice } = calculatingAmount();


    const handleCouponApply = () => {
        const usrCoupon = couponCodeRef.current.value.trim().toUpperCase();
        setCouponCode(usrCoupon);

        switch (usrCoupon) {
            case 'VAMSI10':
                setCouponDiscountPercentage(10);
                break;
            case 'VAMSI20':
                setCouponDiscountPercentage(20);
                break;
            case 'VAMSI30':
                setCouponDiscountPercentage(30);
                break;
            default:
                alert('❌ Invalid Coupon Code');
                setCouponDiscountPercentage(0);
        }

        couponCodeRef.current.value = '';
    };


    let handleCompletePurchase = () => {
        const purchaseDate = new Date().toLocaleString();
        let purchaseDetails = {
            orderId: 'ORD-' + new Date().getTime(),
            date: purchaseDate,
            items: [...cartObjects],
            finalPrice: finalPrice
        };
        console.log('✅ Purchase completed:', purchaseDetails);
        dispatch(ClearCart());
        dispatch(OrderDetails(purchaseDetails));
        setTimeout(() => {
            Navigate("/Orders")
        }, 5000);
    };


    return (
        <div className="cart-fullscreen-wrapper">
        <div className="cart-container">
            <h1>🛒 Your Shopping Cart</h1>

            {cartObjects.length === 0 ? (
                <>
                <p>Your cart is empty.</p>
                <p>Thank you for Shopping you will redirecting to orders page</p>
                </>
            ) : (
                <>
                    <ol className="cart-items">{listItems}</ol>

                    <p>Total Bill: ${totalPrice.toFixed(2)}</p>

                    <div className="discount-buttons">
                        <button onClick={() => setDiscount(10)}>Apply 10% Discount</button>
                        <button onClick={() => setDiscount(20)}>Apply 20% Discount</button>
                        <button onClick={() => setDiscount(30)}>Apply 30% Discount</button>
                    </div>

                    <p>After Discount: ${priceAfterDiscount.toFixed(2)}</p>

                    <div className="coupon-section">
                        <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
                        <button onClick={handleCouponApply}>Apply Coupon</button>
                    </div>

                    <p>Coupon Discount: ${afterDiscount.toFixed(2)}</p>

                    <div className="summary">
                        <p>Tax (17%): ${taxPrice.toFixed(2)}</p>
                        <p><strong>Final Price: ${finalPrice.toFixed(2)}</strong></p>
                    </div>



                    <button className="complete-purchase-btn" onClick={handleCompletePurchase}>
                        Complete Purchase
                    </button>

                    <div className="payment-method">
                        <h3>💳 Select Payment Method:</h3>
                        <button onClick={() => setPaymentMethod('upi')}>📱 UPI</button>
                        <button onClick={() => setPaymentMethod('card')}>💳 Card</button>
                    </div>

                    {paymentMethod === 'upi' && (
                        <div className="upi-section">
                            <h4>Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
                            <QRCode value={`upi://pay?pa=vamsidakoju@ybl&pn=MyStore&am=${finalPrice.toFixed(2)}&cu=INR`} />
                            <p>UPI ID: vamsidakoju@ybl</p>
                        </div>
                    )}

                    {paymentMethod === 'card' && (
                        <div className="card-section">
                            <h4>Enter Card Details</h4>
                            <input type="text" placeholder="Card Number" />
                            <input type="text" placeholder="Cardholder Name" />
                            <input type="text" placeholder="Expiry Date (MM/YY)" />
                            <input type="text" placeholder="CVV" />
                        </div>
                    )}


                </>
            )}
        </div>
        </div>
    );
}

export default Cart;
