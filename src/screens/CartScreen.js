import React, { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";

export default function CartScreen({ match, location }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = parseInt(match.params.id);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  console.log("qty, productId", qty, productId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToCart(productId, qty));
  }, []);
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-image">
                <img src={item.image} alt="product" />
                <div className="cart-name">
                  <div>item.name</div>
                  <div>
                    Qty:
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <div className="cart-price">{item.price}</div>
              </div>
            ))
          )}
        </ul>
        <div className="cart-action">
          <h3>
            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button className="button primary" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
