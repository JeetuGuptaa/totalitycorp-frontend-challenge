import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import '../assets/styles/cart.css'
export default function Cart(){
  const {cart, setCart} = useContext(CartContext);

  useEffect(()=>{
    localStorage.setItem("tcorp_cartItem", JSON.stringify(cart));
  }, [cart])

  const updateTotal = () => {
    return cart.reduce((Total, cur) => {
      console.log(Total)
      return Total + parseFloat(cur.price) * parseFloat(cur.cartCount);
    }, 0);
  };

  const updateCartItem = (item, operation)=>{
    const filteredCart = [];
    if(operation === '+'){
      cart.forEach((object) => {
        if (object.id !== item.id) {
          filteredCart.push(object);
        }else{
          filteredCart.push({...object, cartCount : object.cartCount + 1});
        }
        setCart(filteredCart)
      });
    }else if(operation === '-'){
      cart.forEach((object) => {
        if (object.id !== item.id) {
          filteredCart.push(object);
        }else{
          if(object.cartCount >= 2){
            filteredCart.push({...object, cartCount : object.cartCount - 1});
          }
        }
        setCart(filteredCart)
      });
    }else{
      console.log('operation not defined')
    }
  }

  let total = updateTotal();
  
  const displayCart = cart.map((item)=>{
    return (
      <div className = "cart-item-card" key = {item.id}>
          <div className = "cart-item-thumbnail-container">
            <img src = {item.thumbnail} alt = "item image" className = "cart-item-thumbnail"/>
          </div>
          <div className = "cart-details">
            <div className = "cart-item-title">
              {item.title}
            </div>
            <div className = "cart-item-price">
              ${item.price}
            </div>
            <div className = "cart-buttons">
              <button
                className=" cart-button"
                onClick = {()=>{
                  updateCartItem(item, '-')
                }}
              >-</button>
              <div>{item.cartCount}</div>
              <button
                className = "cart-button"
                onClick = {()=>{
                  updateCartItem(item, '+')
                }}
                disabled = {(item.stock <= item.cartCount || item.cartCount >= 10) ? true : false}
              >+</button>
            </div>
          </div>
        </div>
    )
  })
  return (
    <div className = "cart">
      <div className = "cart-item-container">
        {displayCart}
      </div>
      <div className = "right">
        <div className = "price-details-heading">Price Details</div>
        <hr/>
        <div className = "price-details">
          <div className = "price-item">
            <div>Price ({cart.length} items)</div>
            <div>${total}</div>
          </div>
          <div className = "price-item">
            <div>Delivery Charge</div>
            <div>
              {
                total < 499 && cart.length > 0 ?
                "$50":
                "Free"
            }
            </div>
          </div>
          <div className = "price-item total-amount">
            <div>Total Amount</div>
            <div>
              ${
                total < 499 && cart.length > 0?
                total + 50 :
                total
              }
              
            </div>
          </div>
        </div>
        <button 
          className="add-to-cart-button"
          style = {{width : "100%"}}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}