import { useEffect, useState } from "react";
import Filter from "./Filter";

export default function Product(){
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});
   
    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=100')
        .then(response => response.json())
        .then(data => setProducts(data.products))
    }, []);

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

    const productsToDisplay = filteredProducts.map((product)=>{
        return (
            <div className="product-card" key = {product.id}>
                <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />
                <div className="product-title">{product.title}</div>
                <div className="product-brand">Brand: {product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-discount">Discount: {product.discountPercentage}</div>
                <button>Add to Cart</button>
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