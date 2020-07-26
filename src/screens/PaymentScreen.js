import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


export default function PaymentScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('/placeorder');
    }
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";


    return (
        <div>
            <CheckoutSteps step1 step2 step3/>
        
        
        <div className="form">
            <form onSubmit={submitHandler}>
            <ul class="form-container">
                <li>
                    <h3>Payment</h3>
                </li>
                
                <li>
                    <input type="radio" id="paymentMethod" value="paypal" onChange={e=>setPaymentMethod(e.target.value)}/>
                    <label htmlFor="paymentMethod"> Paypal </label><br/>
                </li>
                

                <li>
                    <button type="submit" className="button primary">Continue</button>
                </li>

            </ul>
            </form>
            
        </div>
        </div>
    )
}
