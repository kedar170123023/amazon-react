import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productListActions";

export default function HomeScreen(props) {
  // ACCESING STORE
  // state of product is container in state.productList
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  // in dispatch we have all necessary actions present
  const dispatch = useDispatch();

  useEffect(() => {
    // accepts a action function having parameter as action i.e contains dipatch
    dispatch(listProducts());
  }, []);
  return loading ? (
    <div>Loading... </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {/* <!-- PRODUCTS --> */}
      {products
        ? products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <img
                  className="product-image"
                  src={product.image}
                  alt="product"
                />
                <div className="product-name">
                  <a href="#">{product.name}</a>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  {product.rating} stars ({product.numReviews} reviews)
                </div>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}
