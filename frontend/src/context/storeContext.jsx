import { createContext,useEffect } from "react"
import { useState } from "react"
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [menu, setMenu] = useState('home');
    const [token,setToken]=useState("")
    const [menuItems,setMenuItems] = useState([])

    const url="http://localhost:5000"

    useEffect(()=>{
        async function loadData() {
            await fetchMenuItems();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const fetchMenuItems = async () => {
        const response = await axios.get(url+"/api/menu/listMenu");
        setMenuItems(response.data.data)
    }



    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

    }

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



    const contextValue = {
        menuItems, addToCart, removeFromCart, cartItems, getTotalCartAmount, setMenu,menu,url,token,setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
