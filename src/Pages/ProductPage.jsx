import { useParams } from "react-router-dom";
import "../assets/styles/ProductPage.css"; 
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function ProductPage(){
  const id = useParams().id;
  const product = useContext(ProductContext)[id-1];
  const [image, setImage] = useState(product.images[0])

  const changeImage = (index) => {
    setImage(product.images[index])
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
          <button className="add-to-cart-button">
            Add to Cart
          </button>
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
