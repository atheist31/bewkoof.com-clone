import axios from "axios";
import * as types from "./actionType";
import { getTokenFromCookies } from "../../utils/token.utils";

export const getCartProduct = () => (dispatch) => {
  dispatch({ type: types.GET_CART_PRODUCT_REQUEST });
  axios

    .get(`http://localhost:8080/cart`, {
      // headers:{
      //   "Authorization": localStorage.getItem("token") || null
      // }
    })

    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.GET_CART_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_CART_PRODUCT_ERROR });
      console.log("err", err);
    });
};

export const addToCartFun = (obj) => (dispatch) => {
  // console.log(obj);
  dispatch({ type: types.POST_CART_PRODUCT_REQUEST });
  axios

    .post(`http://localhost:8080/cart`, obj, {
      headers: {
        Authorization: getTokenFromCookies() || null,
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.POST_CART_PRODUCT_SUCCESS,
        payload: res.data.msg,
      });
    })
    .catch((err) => {
      dispatch({ type: types.POST_CART_PRODUCT_ERROR, payload: err });
    });
};

export const getFromCartFun = () => (dispatch) => {
  // console.log(obj);
  dispatch({ type: types.GET_CART_PRODUCT_REQUEST });
  axios

    .get(`http://localhost:8080/cart`, {
      headers: {
        Authorization: getTokenFromCookies() || null,
      },
    })

    .then((res) => {
      
      dispatch({
        type: types.GET_CART_PRODUCT_SUCCESS,
        payload: res.data.cartsData,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_CART_PRODUCT_ERROR, payload: err });
    });
};

export const deleteCartProduct = (id) => (dispatch) => {
  dispatch({type:types.DELETE_CART_PRODUCT_REQUEST})
  console.log(id);
  return axios.delete(`http://localhost:8080/cart/delete/${id}`, {
    headers: {
      Authorization: getTokenFromCookies() || null,
    },
  })
  .then((res)=>{
    console.log(res.data);
    dispatch({type:types.DELETE_CART_PRODUCT_SUCCESS,payload:res.data})
  }).catch((err)=>{
    dispatch({type:types.DELETE_CART_PRODUCT_ERROR,payload:err})
  })
};

export const updateCartItemQuantity = (id,payload) => (dispatch) => {
  console.log(id,payload)
  dispatch({type:types.UPDATE_QUANTITY_REQUEST})
  return axios.put(`http://localhost:8080/cart/update/${id}`,payload, {
    headers: {
      Authorization: getTokenFromCookies() || null,
    },
  })
  .then((res)=>{
    console.log(res.data);
    dispatch({type:types.UPDATE_QUANTITY_SUCCESS,payload:res.data})
  }).catch((err)=>{
    dispatch({type:types.UPDATE_QUANTITY_ERROR,payload:err})
  })
};


export const getTotalMrpPrice = () => (dispatch) => {
  dispatch({ type: types.GET_TOTALMRP_REQUEST });
  axios

    .get(`http://localhost:8080/cart/totalPrice`, {
      headers:{
        Authorization: getTokenFromCookies() || null,
      }
    })

    .then((res) => {
      console.log(res);
      dispatch({ type: types.GET_TOTALMRP_SUCCESS, payload: res?.data?.totalPrice });
    })
    .catch((err) => {
      dispatch({ type: types.GET_TOTALMRP_ERROR });
      console.log("err", err);
    });
};


export const getToatalDiscountPrice = () => (dispatch) => {
  dispatch({ type: types.GET_DISCOUNT_REQUEST });
  axios

    .get(`http://localhost:8080/cart/totalDiscountPrice`, {
      headers:{
        Authorization: getTokenFromCookies() || null,
      }
    })

    .then((res) => {
      console.log(res.data.totalDiscountPrice);
      dispatch({ type: types.GET_DISCOUNT_SUCCESS, payload: res?.data?.totalDiscountPrice });
    })
    .catch((err) => {
      dispatch({ type: types.GET_DISCOUNT_ERROR });
      console.log("err", err);
    });
};