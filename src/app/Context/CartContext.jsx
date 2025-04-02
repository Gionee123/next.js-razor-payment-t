"use client"
import { createContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

let cartContext = createContext();

export default function CartContext({ children }) {
    
    
    let [cart, setcart] = useState([])

    let obj = {
        cart,
        setcart
    }
    useEffect(() => {
        let oldCartData = JSON.parse(localStorage.getItem("CART")) ?? [];
        setcart(oldCartData)
        
    }, [])

    useEffect(()=>{
        if (cart) localStorage.setItem("CART", JSON.stringify(cart))
    },[])


    return (
        <cartContext.Provider value={obj}>
            {children}
        </cartContext.Provider>

    )
}
export { cartContext }