import React from "react";
import Home from "../Pages/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import MenPage from "../Pages/MenPage/MenPage";
import WomenPage from "../Pages/WomenPage/WomenPage";
import CartPage from "../Pages/CartPage/CartPage";

import AdminDshboardPage from "../Pages/AdminPage/AdminDshboardPage";
import AdminNavbar from "../Components/AdminComponents/AdminNavbar/AdminNavbar";
import AdminAddProduct from "../Components/AdminComponents/AdminProduct/AdminAddProduct";
import AdminShowProduct from "../Pages/AdminPage/AdminShowProduct";
import AdminUpdate from "../Components/AdminComponents/AdminProduct/AdminUpdate";
import Login from "../Pages/LoginPage/Login";
import { PrivateRoute } from "../Components/PrivateRoute";
import Footer from "../Components/Footer";
import Signup from "../Pages/SingupPage/Signup";
import Navbar from "../Components/Navbar";
import SingleProductPage from "../Pages/SingleProductPage/SingleProductPage";
import Wishlist from "../Pages/WishlistPage/Wishlist";
import Payment from "../Pages/PaymentPage/Payment";
import PaymentSuccess from "../Pages/PaymentPage/PaymentSuccess";
import OrderPage from "../Pages/OrderPage/OrderPage";

export const AllRoutes = () => {
  return (
    <>
      {/* user routes-----------------------------> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/men"
          element={
            <>
              <Navbar />
              <MenPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/women"
          element={
            <>
              <Navbar />
              <WomenPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <CartPage />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            // <PrivateRoute>
              <>
                <Navbar />
                <Wishlist />
                <Footer />
              </>
            // </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Navbar />
              <Payment />
              <Footer />
            </>
          }
        />
        <Route
          path="/men/:id"
          element={
            <>
              <Navbar />
              <PrivateRoute>
                <SingleProductPage />
              </PrivateRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/women/:id"
          element={
            <>
              <Navbar />
              <PrivateRoute>
                <SingleProductPage />
              </PrivateRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/user/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/user/register"
          element={
            <>
              <Navbar />
              <Signup />
              <Footer />
            </>
          }
        />

        <Route path="/paymentsuccess" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
      </Routes>

      {/* admin routes ------------------------>*/}
      <Routes>
        <Route
          path="/admin"
          element={
            <>
              <AdminNavbar />
              <AdminDshboardPage />
            </>
          }
        />
        <Route
          path="/admin/product"
          element={
            <>
              <AdminNavbar />
              <AdminShowProduct />
            </>
          }
        />
        <Route
          path="/admin/update/:id"
          element={
            <>
              <AdminUpdate />
            </>
          }
        />
        <Route
          path="/admin/addproduct"
          element={
            <>
              <AdminAddProduct />
            </>
          }
        />
        {/* <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Signup />
              <Footer />
            </>
          }
        /> */}
      </Routes>
    </>
  );
};

/*
<Route path="/admin" element={
            <>
            <AdminNavbar/>
        <AdminDshboardPage />
        </>
        } />
         <Route path="/admin/product" element={
            <>
            <AdminNavbar/>
        <AdminShowProduct />
        </>
        } />
         <Route path="/admin/update/:id" element={
            <>
        <AdminUpdate />
        </>
        } />
        <Route path="/admin/addproduct" element={
            <>
        <AdminAddProduct />
        </>
        } />
*/
