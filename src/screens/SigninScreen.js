import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userActions';


export default function SigninScreen(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const userSignin = useSelector(state=>state.userSignin); 
    const {loading, userInfo, error} = userSignin;


    const submitHandler = (e)=>{
        console.log("running",email,password);
        e.preventDefault();
        dispatch(signin(email,password));

    }

    useEffect(()=>{
        if(userInfo){
            props.history.push("/");
        }
    },[userInfo])

    return (
        <div className="form">
            <ul class="form-container">
                <h3>Sign-In</h3>
            <form onSubmit={submitHandler}>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div> {error}</div>} 
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
                    <button type="submit" className="button primary">Signin</button>
                </li>

                <li>New to KlickKart ? </li>
                <li>
                    <Link to="/register" className="button secondary text-center">Create Your KlickKart Account</Link>
                </li>
            </form>

            </ul>
            
        </div>
    )
}
