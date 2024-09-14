import * as types from "./actionType";
const initialState = {
  isLoading: false,
  isError: false,
  quantity: 1,
  msg: null,
  quantityLoading: false,
  deleteLoading:false,
  cartData: [],
  totalMrp:0,
  totalDiscount:0,
  totalCartProduct:0
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CART_PRODUCT_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_CART_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, cartData: [...payload] };
    case types.GET_CART_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };

    case types.POST_CART_PRODUCT_REQUEST:
      return { ...state, isLoading: true };
    case types.POST_CART_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, msg:payload };
    case types.POST_CART_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: payload };

    case types.DELETE_CART_PRODUCT_REQUEST:
      return { ...state, deleteLoading: true };
    case types.DELETE_CART_PRODUCT_SUCCESS:
      return { ...state, deleteLoading: false, msg: payload.msg };
    case types.DELETE_CART_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: payload };

    case types.UPDATE_QUANTITY_REQUEST:
      return { ...state, quantityLoading: true };
    case types.UPDATE_QUANTITY_SUCCESS:
      return { ...state, quantityLoading: false, msg: payload.msg };
    case types.UPDATE_QUANTITY_ERROR:
      return { ...state, isLoading: false, isError: payload };

      case types.GET_TOTALMRP_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_TOTALMRP_SUCCESS:
      return { ...state, isLoading: false, totalMrp:payload};
    case types.GET_TOTALMRP_ERROR:
      return { ...state, isLoading: false, isError: true };

      case types.GET_DISCOUNT_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_DISCOUNT_SUCCESS:
      return { ...state, isLoading: false, totalDiscount:payload };
    case types.GET_DISCOUNT_ERROR:
      return { ...state, isLoading: false, isError: true };

      case types.GET_TOTALCART_PRODUCT:
        return {...state,totalCartProduct:payload}
    default:
      return state;
  }
};
