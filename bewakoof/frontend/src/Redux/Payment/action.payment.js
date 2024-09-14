import baseurl from "../../urlconfig";
import { getTokenFromCookies } from "../../utils/token.utils";
import * as types from "./actionType.payment";
import axios from "axios";


export const paymentProcessAction = (amount, user,navigate) => async (dispatch) => {
  dispatch({ type: types.PAYMENT_REQUEST });

  try {
    console.log({ amount, user });

    const {
      data: { key },
    } = await axios.get(`${baseurl}/payment/getkey`,{
      headers:{
        Authorization:getTokenFromCookies() || null
      }
    });
    const {
      data: { order },
    } = await axios.post(`${baseurl}/payment/checkout`, { amount },{
      headers:{
        Authorization:getTokenFromCookies() || null
      }
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Apna Ecommerce",
      description: "Exploring RazorPay",
      image: "https://avatars.githubusercontent.com/u/105533945?v=4",
      order_id: order.id,
      // callback_url: `${baseurl}/payment/paymentverification`,
      "handler": function (response){
        console.log(response,"response");
        dispatch({type:types.PAYMENT_SUCCESS,payload:response})
        clearCartProduct();
        navigate("/paymentsuccess")
        
    },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0d0707",
      },
    };
    const razor = new window.Razorpay(options);
    if(razor){
      razor.open();
      dispatch({type:types.PAYMENT_SUCCESS})
    }
    
  } catch (err) {
    dispatch({type:types.PAYMENT_FAILURE})
  }
};

export const clearCartProduct = ()  => {
  axios
    .delete(`${baseurl}/cart/clearCart`, {
      headers: {
        Authorization: getTokenFromCookies() || null,
      },
    })
    .then((res) => {
      // dispatch({ type: types.CLEAR_CART, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
