import { useParams } from "react-router-dom";
import "../assets/styles/ProductPage.css"; 
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductPage(){
  const id = useParams().id;
  const product = useContext(ProductContext)[id-1];
  const {cart, setCart} = useContext(CartContext);
  const [image, setImage] = useState(product.images[0]);
  
  useEffect(()=>{
    localStorage.setItem("tcorp_cartItem", JSON.stringify(cart));
  }, [cart])

  const changeImage = (index) => {
    setImage(product.images[index])
  }

  const addToCart = ()=> {
    setCart(prev => {
      return [...prev, {...product, cartCount : 1}]
    })
  }

  const alreadyInCart = (cart, curProduct) =>{
    return cart.some((item) => {
        return item.id === curProduct.id
    })
}
  
  return (
    product.id? (
      <div className="product-page">
        <div className="product-details">
          <div className="product-title">{product.title}</div>
          <div className="product-brand">Brand: {product.brand}</div>
          <div className="product-price">
            <span className="price">${product.price.toFixed(2)}</span>
            <span className="discount">
              {product.discountPercentage.toFixed(2)}% off
            </span>
          </div>
          <div className="product-rating">
            {product.rating.toFixed(1)}{" "}
            {/* <FaStar className="star-icon" /> */}
          </div>
          <div className="product-description">
            {product.description}
          </div>
          {
            alreadyInCart(cart, product)?
            <Link to={`/cart`} className="add-to-cart-button">
              Go To Cart
            </Link>:
            <button
              className="add-to-cart-button"
              onClick = {addToCart}
            >
              Add To Cart
            </button>
          }
          
        </div>
        <div className="product-images">
          <img
            src={image}
            alt={`Product ${product.id}`}
            className="product-thumbnail"
          />
          <div className="image-list">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="product-image"
                onClick = {() => {
                  changeImage(index)
                }}
              />
            ))}
          </div>
        </div>
      </div>):
      <h1>Fetching...</h1>
    );
};
