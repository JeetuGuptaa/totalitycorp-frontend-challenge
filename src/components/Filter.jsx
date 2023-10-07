export default function Filter({setFilters}){
    const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
        return {
                    ...prev,
                    [name] : value
                }
    });
    };

    const categories = [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting"
    ]

    return (
    <div className="product-filter">
        <select name="category" onChange={handleFilterChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
            <option key={category} value={category}>
            {category}
            </option>
        ))}
        </select>
        <select name="priceRange" onChange={handleFilterChange}>
        <option value="">All Prices</option>
        <option value="0-50">$0 - $50</option>
        <option value="50-100">$50 - $100</option>
        <option value="100-200">$100 - $200</option>
        <option value="200-100000">Over $200</option>
        </select>
        <select name="ratings" onChange={handleFilterChange}>
        <option value="">All Ratings</option>
        <option value="4.5+">4.5+ Stars</option>
        <option value="4+">4+ Stars</option>
        <option value="3+">3+ Stars</option>
        <option value="2+">2+ Stars</option>
        <option value="1+">1+ Star</option>
        </select>
    </div>
    );
};

