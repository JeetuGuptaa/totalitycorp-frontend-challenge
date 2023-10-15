import { createContext, useEffect, useState } from "react";

const CartContext = createContext([])

function CartContextProvider({children}){
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("tcorp_cartItem")) || []
    });

    return (
        <CartContext.Provider value = {{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
}

export {CartContext, CartContextProvider};