import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  redirect,
  useSearchParams,
  Navigate,
  useNavigate,
} from "react-router-dom";

import styles from "./PaymentSuccess.module.css";
import { useSelector } from "react-redux";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("clicked");
    <Navigate to={"/"} />;
    navigate("/");
  };
  const seachQuery = useSearchParams()[0];

  const { responseObj } = useSelector( (store) => store.PaymentReducer);
  console.log(responseObj);
  return (
    <>
      

      <Box
        backgroundColor="#D9AFD9"
        backgroundImage="linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)"
      >
        <VStack h="100vh" justifyContent={"center"}>
          <Heading textTransform={"uppercase"}> Order Successfull</Heading>

          <Text>Reference No:-{responseObj?.razorpay_payment_id}</Text>

          <Button onClick={handleClick}>Shop More</Button>
        </VStack>
      </Box>
    </>
  );
};

export default PaymentSuccess;
