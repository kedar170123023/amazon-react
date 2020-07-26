import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function CartScreen({ match, location, history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  console.log("qty, productId", qty, productId);

  const removeFromHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(productId,qty);
    dispatch(addToCart(productId, qty));
  }, []);

  return (
    <div className="cart">
      <div className="cart-list">
        {/* CART LIST CONTAINER */}
        <ul className="cart-list-container">
          <li>
            <div>
              <h3>Shopping Cart</h3>
            </div>
            <div>Price</div>
          </li>
          {/* IF CART IS EMPTY*/}
          {cartItems.length === 0 && (
            <div>
              Cart is empty! <Link to="/">Go shopping</Link>{" "}
            </div>
          )}

          {/* IF CART IS NOT EMPTY */}

          {cartItems.map((item) => (
            <li key={item.product}>
              {/* IMAGE CONTAINING */}
              <div className="cart-image">
                <img src={item.image} alt="product" />
              </div>
              {/* PRODUCT DETAILS */}

              <div className="cart-name">
                <div>
                  <Link to={`/product/${item.product}`}>{item.name} </Link>
                </div>

                <div className="cart-list-actions">
                  Qty:
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  {/* REMOVE FROM CART */}
                  <button
                    type="button"
                    className="button"
                    onClick={(e) => removeFromHandler(item.product)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* PRICE */}
              <div className="cart-price">${item.price}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* CHECKOUT */}

      <div className="cart-action">
        <h3>
          {/* sum = sum + item->quantity */}
          Subtotal ({cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items)
          : ${/* total price = total price + item->quantity*item->price  */}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          className="button primary"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
