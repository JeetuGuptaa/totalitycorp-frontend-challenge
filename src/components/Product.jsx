import { useEffect, useState } from "react";
import Filter from "./Filter";
import Card from './ProductCard'
import "../assets/styles/product.css"

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

    const productsToDisplay = filteredProducts.map((product) => {
        return <Card product = {product} key={product.id}/>
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