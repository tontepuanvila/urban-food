import { createContext,useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [menu, setMenu] = useState('home');
    const [token,setToken]=useState("")
    const [menuItems,setMenuItems] = useState([])
    const {login}=useAuth()

    const url="http://localhost:5000"

   

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(url + "/api/menu/listMenu");
            setMenuItems(response.data.data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
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
            console.error("Error loading cart data:", error);
        }
    };
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = menuItems.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
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
        menuItems, addToCart, removeFromCart, cartItems, getTotalCartAmount, setMenu,menu,url,token,setToken,fetchMenuItems
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
