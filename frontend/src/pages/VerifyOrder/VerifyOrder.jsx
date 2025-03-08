import React, { useEffect } from 'react'
import './VerifyOrder.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/storeContext';

const VerifyOrder = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verifyOrder",{success,orderId});
        if (response.data.success){
            navigate("/myorders");
        }
        else {
            navigate("/cart")
        }
    }


    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default VerifyOrder