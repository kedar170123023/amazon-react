import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from '../components/CheckoutSteps'

export default function PlaceOrderScreen({ match, location, history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  if(!shipping.address){
      history.push("/shipping")
  }
  else if(!payment.paymentMethod){
    history.push("/payment")
  }



  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };

  const itemsPrice = cartItems.reduce((a, c)=>a+c.price*c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice*0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = ()=>{

  }

  const dispatch = useDispatch();
  useEffect(() => {
  }, []);

  return (
      <div>
          <CheckoutSteps step1 step2 step3 step4/>
    <div className="placeorder">
      <div className="placeorder-info">
        {/* CART LIST CONTAINER */}

        <div>
            <h3>Shipping</h3>
            <div>
                  {cart.shipping.address}, {cart.shipping.city},
                  {cart.shipping.postalCode}, {cart.shipping.country}
              </div>
        </div>
        <div>
            <h3>Payment</h3>
            <div>
                Payment Method : {cart.payment.paymentMethod}
            </div>

        </div>
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
                  Qty: {item.qty}
                  {/* REMOVE FROM CART */}
                </div>
              </div>
              {/* PRICE */}
              <div className="cart-price">${item.price}</div>
            </li>
          ))}
        </ul>


              </div>

      {/* CHECKOUT */}

      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
          </li>
          <li>
            <h3>
              order Summary               
            </h3>
          </li>
          <li>
            <div>Items</div>
          <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
          <div>${shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
          <div>${taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
          <div>${totalPrice}</div>
          </li>
        </ul>
        
      </div>
    </div>
    </div>

  );
}
