import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productListActions";

// TODO Write customer review

export default function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(match.params.id));
  }, []);

  const handleAddToCart = () => {
    history.push("/cart/" + match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      {/* GO BACK  */}
      <div className="back-to-results">
        <Link to="/"> Back to result</Link>
      </div>
      {loading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        product && (
          // DETAILS PART
          <div className="details">
            {/* IMAGE */}
            <div className="details-image">
              <img src={product.image} alt="product" />
            </div>
            {/* INFORMATION */}
            {/* ********************************************************************* */}
            <div className="details-info">
              <ul>
                {/* ------------------------------------------- */}
                <li>
                  <h3>{product.name}</h3>
                </li>
                {/* ------------------------------------------- */}
                <li>
                  {product.rating} stars ({product.numReviews} Reviews)
                </li>
                {/* ------------------------------------------- */}
                <li>
                  Price : <b>${product.price}</b>
                </li>
                {/* ------------------------------------------- */}
                <li>
                  Description :<div>{product.description}</div>
                </li>
                {/* ------------------------------------------- */}
              </ul>
            </div>
            {/* ********************************************************************* */}

            {/* DETAILS ACTION */}
            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <div className="details-action">
              <ul>
                {/* ------------------------------- */}
                <li>Price : {product.price}</li>
                {/* ------------------------------- */}
                <li>
                  Status :{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </li>
                {/* ------------------------------- */}
                <li>
                  Qty :
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                {/* ------------------------------- */}
                <li>
                  {product.countInStock && (
                    <button className="button" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                  )}
                </li>
                {/* ------------------------------- */}
              </ul>
            </div>
            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          </div>
        )
      )}
    </div>
  );
}
