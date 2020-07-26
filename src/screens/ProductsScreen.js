import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productListActions';


export default function ProductsScreen() {

    const [modalVisible, setModalVisible]       = useState(false);
    const [id,               setId]             = useState("")
    const [name,             setName]           = useState("");
    const [price,            setPrice]          = useState("");
    const [image,            setImage]          = useState("");
    const [brand,            setBrand]          = useState("");
    const [category,         setCategory]       = useState("");
    const [countInStock,     setCountInStock]   = useState("");
    const [description,      setDescription]    = useState("");

    const productSave = useSelector(state=>state.productSave);
    const {loading : loadingSave, success : successSave, error : errorSave} = productSave;
    const productDelete = useSelector(state=>state.productDelete);
    const {loading : loadingDelete, success : successDelete, error : errorDelete} = productDelete;
    const productList = useSelector(state=>state.productList);
    const {loading, products, error } = productList;

    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveProduct({_id : id,name, price, image, brand, category, countInStock, description}));
    }

    const openModal = (product)=>{
        console.log("openmodal called", modalVisible);
        console.log("openmodal called product._id",product._id );
        setModalVisible(true);
        setId(product._id || "");
        setName(product.name|| "");
        setPrice(product.price|| "");
        setImage(product.image|| "");
        setBrand(product.brand|| "");
        setCategory(product.category|| "");
        setCountInStock(product.countInStock|| "");
        setDescription(product.description|| "");
    }

    useEffect(()=>{
        if(successSave){
            setModalVisible(false);}
        dispatch(listProducts());
    },[successSave, successDelete]);

    const deleteHandler = (product)=>{
        dispatch(deleteProduct(product._id));
    }


    return (

        // BUTTON FOR CREATING PRODUCT
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick={()=>openModal({})}>Create Product</button>
            </div>

            {/* FORM TO ADD PRODUCT */}
            {
                modalVisible && 
                <div className="form">
                <ul className="form-container">
                    <h3>Create Product</h3>
                <form onSubmit={submitHandler}>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div> {errorSave}</div>} 
                    </li>
                    <li>
                        <label htmlFor="name"> Name </label><br/>
                        <input type="text" id="name" onChange={e=>setName(e.target.value)} value={name}/>
                    </li>
                    <li>
                        <label htmlFor="price"> Price </label><br/>
                        <input type="text" id="price" onChange={e=>setPrice(e.target.value)} value={price}/>
                    </li>
                    <li>
                        <label htmlFor="image"> Image </label><br/>
                        <input type="text" id="image" onChange={e=>setImage(e.target.value)} value={image}/>
                    </li>
                    <li>
                        <label htmlFor="brand"> Brand </label><br/>
                        <input type="text" id="brand" onChange={e=>setBrand(e.target.value)} value={brand}/>
                    </li>
                    <li>
                        <label htmlFor="category"> Category </label><br/>
                        <input type="text" id="category" onChange={e=>setCategory(e.target.value)} value={category}/>
                    </li>
                    <li>
                        <label htmlFor="countInStock"> CountInStock </label><br/>
                        <input type="text" id="countInStock" onChange={e=>setCountInStock(e.target.value)} value={countInStock}/>
                    </li>
                    
                    <li>
                        <label htmlFor="description"> Description </label><br/>
                        <textarea id="description" onChange={e=>setDescription(e.target.value)} value={description}/>
                    </li>
                    <li>
                        <button type="submit" className="button primary"> {id ? "Update" : "Create"}</button>
                    </li>
                    <li>
                        <button type="button" className="button secondary" onClick={()=>setModalVisible(false)}>Back</button>
                    </li>
                </form>
                </ul>
            </div>
            }



            {/* PRODUCT LIST */}
            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Count In Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { products.map(product =>
                        <tr key={product._id}>

                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{product.countInStock}</td>
                        <td>
                            <button className="button" onClick={()=>openModal(product)}>Edit</button>{" "}
                            <button className="button" onClick={()=>deleteHandler(product)}>Delete</button>
                        </td>
                        </tr>

                    )}       
                    </tbody>
                </table>
            </div>
        </div>

        
    )
}
