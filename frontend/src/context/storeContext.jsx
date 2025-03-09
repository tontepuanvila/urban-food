import { createContext,useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { toast } from "react-toastify"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token,setToken]=useState("")
    const [menuItems,setMenuItems] = useState([])
    const {login}=useAuth()

    const url=import.meta.env.VITE_BACKEND_URL

   

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(url + "/api/menu/listMenu");
            setMenuItems(response.data.data);
        } catch (error) {
            toast.error("Unable to fetch the Menu")
        }
    };


    const addToCart = async (itemId) => {
        if (!cartItems?.[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token){
            await axios.post(url+"/api/cart/addToCart",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/removeFromCart",{itemId},{headers:{token}})
        }

    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/getCartItems", {}, { headers: { token } });
            const cartData = response.data.data
            setCartItems(cartData);
        } catch (error) {
            toast.error("Unable to fetch Cart Items.");
        }
    };
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        
        // Iterate over the cart items
        for (const item in cartItems) {
            if (cartItems?.[item] > 0) {
                // Find the corresponding item in the menuItems
                let itemInfo = menuItems.find((product) => product._id.toString() === item.toString());
                
                // If itemInfo is found and has a valid price
                if (itemInfo && itemInfo.price) {
                    totalAmount += parseFloat(itemInfo.price) * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    

    useEffect(()=>{
        async function loadData() {
            await fetchMenuItems();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                login({role:localStorage.getItem("role")});
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])



    const contextValue = {
        menuItems, addToCart, removeFromCart, cartItems, getTotalCartAmount,url,token,setToken,fetchMenuItems,setCartItems
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
