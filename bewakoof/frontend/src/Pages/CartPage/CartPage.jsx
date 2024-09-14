import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,  useNavigate } from "react-router-dom";
import SingleCartItem from "../../Components/CartPageComponents/SingleCartItem";
import {
  getFromCartFun,
  deleteCartProduct,
  getTotalMrpPrice,
  getToatalDiscountPrice,
  getTotalCartProduct,
} from "../../Redux/Cart/action";
import styles from "./CartPage.module.css";
import useCustomToast from "../../hooks/useCustomToast";
import { paymentProcessAction} from "../../Redux/Payment/action.payment";
import { EMPTY_CART_LOGO_URL } from "../../utils/constant";

const CartPage = () => {
  const dispatch = useDispatch();
  const showToast = useCustomToast();
  const navigate = useNavigate();
  const {
    cartData,
    isLoading,
    quantityLoading,
    deleteLoading,
    totalMrp,
    totalDiscount,
    totalCartProduct,
  } = useSelector((store) => store.cartReducer);

  const { user } = useSelector((store) => store.authReducer);
  const { isPaymentLoading } = useSelector(
    (store) => store.PaymentReducer
  );
  console.log(isPaymentLoading, "isPaymentLoading");
  console.log(user, "user");

  useEffect(() => {
    dispatch(getFromCartFun());
    dispatch(getTotalMrpPrice());
    dispatch(getToatalDiscountPrice());
    dispatch(getTotalCartProduct());
  }, [quantityLoading, deleteLoading, dispatch]);

  const handleRemoveCartData = (id) => {
    console.log("deleted");
    dispatch(deleteCartProduct(id)).then(() => {
      showToast("Removed from Cart", "error", 3000);
    });
  };

  const PaymentHandler = (amount) => {
    dispatch(paymentProcessAction(amount, user, navigate));
  };

  if (cartData.length === 0) {
    return (
      <div className={styles.emptyBag}>
        <div>
          <img
            src={EMPTY_CART_LOGO_URL}
            alt="EMPTY_CART_LOGO"
          />
        </div>
        <p>Bag is Empty</p>

        <Link to={"/"}>
          <Button border={"1px solid green"}>Continue Shoping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.totalItem}>
        <b>My Bag</b>
        {totalCartProduct} items(s)
      </div>
      <div className={styles.cartpage_container}>
        {(isLoading || deleteLoading) && (
          <h1 className={styles.loader}>Loading...</h1>
        )}
        <div className={styles.allcartproducts}>
          {cartData &&
            cartData.map((el) => {
              return (
                <SingleCartItem
                  key={el._id}
                  {...el}
                  handleRemoveCartData={handleRemoveCartData}
                />
              );
            })}
        </div>
        <div className={styles.cartPageRightSide}>
          <div className={styles.cashbackDetails}>
            Whistles! Get extra 10% cashback on all prepaid orders above Rs.499.
            Use Code - PREP10.
          </div>
          <div className={styles.coupon}>
            Apply Coupon / Gift Card / Referral
          </div>
          <div className={styles.allPriceDetails}>
            <p className={styles.summary}>PRICE SUMMARY</p>
            <div className={styles.totolMrp}>
              <p>Total MRP (Incl. of taxes)</p>
              <p>₹{totalMrp}</p>
            </div>
            <div className={styles.shipingCharges}>
              <p>Shipping Charges </p>
              <p>FREE</p>
            </div>
            <div className={styles.bagDiscount}>
              <p>Bag Discount</p>
              <p>₹{totalDiscount}</p>
            </div>
            <hr />
            <div className={styles.total}>
              <div>
                <p>Total</p>
                <p>₹{totalMrp - totalDiscount}</p>
              </div>
              <div>
                <Link>
                  <Button
                    colorScheme="twitter"
                    isLoading={isPaymentLoading}
                    loadingText={"Please wait..."}
                    onClick={() => PaymentHandler(totalMrp - totalDiscount)}
                    className={styles.button}
                  >
                    CONTINUE
                  </Button>
                </Link>
              </div>
            </div>
            <div className={styles.img}>
              <img
                src="https://images.bewakoof.com/web/cart-badge-trust.svg"
                alt="img"
              />
              <img
                src="https://images.bewakoof.com/web/cart-easy-return.svg"
                alt="img"
              />
              <img
                src="https://images.bewakoof.com/web/quality-check.svg"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
