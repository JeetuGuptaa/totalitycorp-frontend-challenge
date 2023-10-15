import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

export default function Product(){
    const products = useContext(ProductContext)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const {cart, setCart} = useContext(CartContext);
    console.log(cart)
    useEffect(()=>{
        localStorage.setItem("tcorp_cartItem", JSON.stringify(cart));
    }, [cart])
    

    useEffect(() => {
        let filtered = [...products]
        if(filters.category){
            filtered = filtered.filter((curProduct) =>{
                return curProduct.category === filters.category;
            })
        }
        if(filters.ratings){
            filtered = filtered.filter((curProduct) =>{
                const minRating = parseFloat(filters.ratings);
                return curProduct.rating > minRating;
            })
        }
        if (filters.priceRange) {
            filtered = filtered.filter((product) => {
                const [min, max] = filters.priceRange.split("-");
                const price = parseFloat(product.price);
                return price >= parseFloat(min) && price <= parseFloat(max);
            });
        }
        setFilteredProducts(filtered)
    }, [filters, products])

    const addToCart = (product)=> {
        setCart(prev => {
            return [...prev, {...product, cartCount : 1}]
        })
    }
    
    const alreadyInCart = (cart, curProduct) =>{
        return cart.some((item) => {
            return item.id === curProduct.id
        })
    }

    const productsToDisplay = filteredProducts.map((product)=>{
        return (
            <div className="product-card" key = {product.id}>
                <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />
                <div className="product-title">{product.title}</div>
                <div className="product-brand">Brand: {product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-discount">Discount: {product.discountPercentage}</div>   
                <div className = "flex">            
                    <Link to={`/product/${product.id}`} className="add-to-cart-button">
                        View
                    </Link>
                    {
                        alreadyInCart(cart, product) ? (
                            <Link to={`/cart`} className="add-to-cart-button">
                                Go To Cart
                            </Link>
                            ) : (
                            <button
                            className="add-to-cart-button"
                            onClick={() => {
                                addToCart(product); 
                            }}
                            >
                                Add To Cart
                            </button>
                        )
                    }
                </div> 
            </div>
        )
    })
    
    return (
        <>
            <Filter setFilters={setFilters}/>
            <div className = "product-list">
                {productsToDisplay}
            </div>
        </>
    );
}