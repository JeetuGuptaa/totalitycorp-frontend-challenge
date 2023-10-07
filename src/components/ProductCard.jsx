export default function Card({product}){
    return (
        <div className="product-card">
            <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />
            <div className="product-title">{product.title}</div>
            <div className="product-brand">Brand: {product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-discount">Discount: {product.discountPercentage}</div>
            <div className="product-rating">Rating: {product.rating}</div>
            <button className="add-to-cart-button">Add to Cart</button>
        </div>
    )
}