import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


export default function RegisterScreen(props) {

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveShipping({address, city, postalCode, country}));
        props.history.push('/payment');
    }
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";


    return (
        <div>
            <CheckoutSteps step1 step2/>
        
        
        <div className="form">
            <form onSubmit={submitHandler}>
            <ul class="form-container">
                <li>
                    <h3>Shipping</h3>
                </li>
                
                <li>
                    <label htmlFor="address"> Address </label><br/>
                    <input type="text" id="address" onChange={e=>setAddress(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="city"> City </label><br/>
                    <input type="text" id="city" onChange={e=>setCity(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="postalCode"> Postal Code </label><br/>
                    <input type="text" id="postalCode" onChange={e=>setPostalCode(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="country"> Country </label><br/>
                    <input type="text" id="country" onChange={e=>setCountry(e.target.value)}/>
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
