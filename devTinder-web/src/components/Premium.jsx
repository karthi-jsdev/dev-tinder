import React from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(() => {
        verifyPremiumUser()
    }, [])
    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true })
        if (res.data.isPremium) {
            setIsUserPremium(true)
        }
    }
    const handleBuyclick = async (type) => {
        const order = await axios.post(BASE_URL + '/payment/create', { membershipType: type }, { withCredentials: true })
        const { amount, keyId, currency, notes, orderId } = order.data
        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount, // Amount is in currency subunits.
            currency,
            name: 'Dev Tinder',
            description: 'Connect to other developers',
            order_id: orderId, // This is the order_id created in the backend
            callback_url: 'http://localhost:3000/payment-success', // Your success URL
            prefill: {
                name: notes.firstName + '' + notes.lastName,
                email: notes.emailId,
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
            handler: verifyPremiumUser
        };
        // It should open the razorpay dialogue box
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return (
        isUserPremium ? 'you are already a premium user' : <div className='flex min-h-screen justify-center items-center gap-10 bg-gray-100 p-10'>

            
            <div className="hover-3d w-64 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">

                <img
                    src="https://img.daisyui.com/images/stock/card-1.webp?x"
                    alt="Silver Plan"
                    className="w-full h-40 object-cover"
                />

                <div className="p-5 text-center flex flex-col items-center">
                    <h2 className="text-lg text-gray-500 font-semibold">Silver Plan</h2>
                    <p className="text-gray-500 text-sm mt-1">Basic access</p>
                    <p className="text-xl text-gray-500 font-bold mt-2">₹499</p>

                    <button onClick={() => handleBuyclick('silver')} className="mt-4 w-full py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition">
                        Buy Silver
                    </button>
                </div>

            
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
            </div>

            
            <div className="hover-3d w-64 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center border-2 border-yellow-400">

                <img
                    src="https://img.daisyui.com/images/stock/card-3.webp?x"
                    alt="Gold Plan"
                    className="w-full h-40 object-cover"
                />

                <div className="p-5 text-center flex flex-col items-center">
                    <h2 className="text-lg text-gray-500 font-semibold">Gold Plan</h2>
                    <p className="text-gray-500 text-sm mt-1">Most popular</p>
                    <p className="text-xl text-gray-500 font-bold mt-2">₹999</p>

                    <button onClick={() => handleBuyclick('gold')} className="mt-4 w-full py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition">
                        Buy Gold
                    </button>
                </div>

                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
            </div>

            
            <div className="hover-3d w-64 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">

                <img
                    src="https://img.daisyui.com/images/stock/card-2.webp?x"
                    alt="Platinum Plan"
                    className="w-full h-40 object-cover"
                />

                <div className="p-5 text-center flex flex-col items-center">
                    <h2 className="text-lg text-gray-500 font-semibold">Platinum Plan</h2>
                    <p className="text-gray-500 text-sm mt-1">Premium features</p>
                    <p className="text-xl text-gray-500 font-bold mt-2">₹1999</p>

                    <button onClick={() => handleBuyclick('platinum')} className="mt-4 w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
                        Buy Platinum
                    </button>
                </div>

                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
            </div>

        </div>
    )
}

export default Premium