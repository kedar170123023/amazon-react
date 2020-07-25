import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct } from '../actions/productListActions';


export default function ProductsScreen() {

    const [name,             setName]           = useState("");
    const [price,            setPrice]          = useState("");
    const [image,            setImage]          = useState("");
    const [brand,            setBrand]          = useState("");
    const [category,         setCategory]       = useState("");
    const [countInStock,     setCountInStock]   = useState("");
    const [description,     setDescription]     = useState("");

    const productSave = useSelector(state=>state.productSave);
    const {loading : loadingSave, success : successSave, error : errorSave} = productSave;
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveProduct({name, price, image, brand, category, countInStock, description}));
    }
    return (
        <div className="form">
            <ul class="form-container">
                <h3>Create Product</h3>
            <form onSubmit={submitHandler}>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div> {errorSave}</div>} 
                </li>
                <li>
                    <label htmlFor="name"> Name </label><br/>
                    <input type="text" id="name" onChange={e=>setName(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="price"> Price </label><br/>
                    <input type="text" id="price" onChange={e=>setPrice(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="image"> Image </label><br/>
                    <input type="text" id="image" onChange={e=>setImage(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="brand"> Brand </label><br/>
                    <input type="text" id="brand" onChange={e=>setBrand(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="category"> Category </label><br/>
                    <input type="text" id="category" onChange={e=>setCategory(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="countInStock"> CountInStock </label><br/>
                    <input type="text" id="countInStock" onChange={e=>setCountInStock(e.target.value)}/>
                </li>
                
                <li>
                    <label htmlFor="description"> Description </label><br/>
                    <textarea id="description" onChange={e=>setDescription(e.target.value)}/>
                </li>
                <li>
                    <button type="submit" className="button primary">Create</button>
                </li>
            </form>
            </ul>
        </div>
    )
}
