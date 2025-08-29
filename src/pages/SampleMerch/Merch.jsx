import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to load the Razorpay script
const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL, // Your backend URL
    withCredentials: true, // <-- THE MAGIC HAPPENS HERE
});

function Merch() {
    const [loading, setLoading] = useState(false);

    // --- CONFIGURATION ---
    const API_BASE_URL = 'http://localhost:3000/api/v1'; 
    const PRODUCT_AMOUNT = 100; 
    const YOUR_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID; //test id

    useEffect(() => {
        loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    }, []);

    const handlePayment = async () => {
        setLoading(true);

        try {
            console.log('Requesting to create order...');
            const { data: createOrderResult } = await api.post(`/payment/create`, {
                amount: PRODUCT_AMOUNT,
                currency: 'INR',
            },
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // }
            );

            if (!createOrderResult.success) throw new Error(createOrderResult.message);
            
            const order = createOrderResult.data;
            console.log('Order created:', order);

            // 2. Open Razorpay Checkout
            const options = {
                key: YOUR_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Test Transaction",
                order_id: order.id,
                handler: async function (response) {
                    console.log('Payment successful, verifying...');
                    // 3. Verify Payment using Axios
                    try {
                        const { data: verifyResult } = await api.post(`/payment/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderDetails: order,
                        });

                        if (verifyResult.success) {
                            alert('Payment Verified Successfully!');
                            console.log('Verification successful:', verifyResult);
                        } else {
                            throw new Error(verifyResult.message || 'Verification failed.');
                        }
                    } catch (err) {
                        // Axios wraps server errors in err.response.data
                        const errorMessage = err.response?.data?.message || err.message;
                        alert(`Verification Error: ${errorMessage}`);
                        console.error('Verification Error:', err);
                    } finally {
                        setLoading(false);
                    }
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', (response) => {
                alert(`Payment Failed: ${response.error.description}`);
                console.error('Payment Failed:', response.error);
                setLoading(false);
            });
            paymentObject.open();

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            alert(`Error: ${errorMessage}`);
            console.error('Process Error:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Razorpay Payment Test (Public, Axios)</h1>
            <p>
                This page allows anyone to make a payment without being logged in.
            </p>
            <hr />
            <div>
                <h3>Product: Test Item</h3>
                <p>Price: ₹{PRODUCT_AMOUNT.toFixed(2)}</p>
            </div>
            <hr />
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : `Pay ₹${PRODUCT_AMOUNT}`}
            </button>
        </div>
    );
}

export default Merch;
