import { useEffect, useState } from "react";

export default function Product(){
    const [products, setProducts] = useState([]);

    console.log(products)

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=100')
        .then(response => response.json())
        .then(data => setProducts(data.products))
    }, []);

    const allProducts = products.map((product)=>{
        return (
            <div className="product-card">
                <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />
                <div className="product-title">{product.title}</div>
                <div className="product-brand">Brand: {product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-discount">Discount: {product.discountPercentage}</div>
            </div>
        )
    })

    return (
        <>
            
            <div className = "product-list">
                {allProducts}
            </div>
        </>
    );
}