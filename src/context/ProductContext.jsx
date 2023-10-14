import {createContext, useState, useEffect} from 'react'

const ProductContext = createContext(null);

const ProductContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=100')
        .then(response => response.json())
        .then(data => {
            setProducts(data.products);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    return (
        <ProductContext.Provider value = {products} >
            {Loading ? (
            <div>Loading...</div>
        ) : (
                <div>
                    {children}
                </div>
        )}
        </ProductContext.Provider>
    )
}

export {ProductContextProvider, ProductContext};