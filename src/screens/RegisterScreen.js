import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userActions';


export default function RegisterScreen(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const dispatch = useDispatch();
    const userRegister = useSelector(state=>state.userRegister); 
    const {loading, userInfo, error} = userRegister;


    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(register(name, email,password));
    }
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[userInfo])

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
            <ul class="form-container">
                <li>
                    <h3>Careate Account</h3>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div> {error}</div>} 
                </li>
                <li>
                    <label htmlFor="name"> Name </label><br/>
                    <input type="text" id="name" onChange={e=>setName(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="email"> Email </label><br/>
                    <input type="email" id="email" onChange={e=>setEmail(e.target.value)}/>
                </li>
                
                <li>
                    <label htmlFor="password"> Password </label><br/>
                    <input type="password" id="password" onChange={e=>setPassword(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="rePassword">Confirm Password </label><br/>
                    <input type="password" id="rePassword" onChange={e=>setRePassword(e.target.value)}/>
                </li>

                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>

                <li>New to KlickKart ? </li>
                <li>
                   Already have an Acoount?
                    <Link to={redirect==='/'?"signin": "signin?redirect="+redirect} className="button secondary text-center">Sign-in</Link>

                </li>

            </ul>
            </form>
            
        </div>
    )
}
