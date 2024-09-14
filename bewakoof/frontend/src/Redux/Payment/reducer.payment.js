import * as types from "./actionType.payment";
const initialState = {
  isPaymentLoading:false,
  isPaymentSuccess:false,
  isPaymentError:false,
  msg:"",
  responseObj:{}
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.PAYMENT_REQUEST:
      return { ...state, isPaymentLoading: true };
    case types.PAYMENT_SUCCESS:
      return { ...state, isPaymentLoading: false, isPaymentSuccess: true,responseObj:{...payload} };
    case types.PAYMENT_FAILURE:
      return { ...state, isPaymentLoading: false, isPaymentError: true };

    default:
      return state;
  }
};