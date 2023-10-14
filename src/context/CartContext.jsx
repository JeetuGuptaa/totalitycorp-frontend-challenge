import { createContext, useEffect, useState } from "react";

const CartContext = createContext({})

function CartContextProvider({children}){
    const [cart, setCart] = useState({});

    useEffect(()=>{
        const cartItems = JSON.parse(localStorage.getItem("tcorp_cartItem"));
        if(cartItems){
            setCart(cartItems);
        }
    }, [])

    return (
        <CartContext.Provider value = {{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
}

export {CartContext, CartContextProvider};