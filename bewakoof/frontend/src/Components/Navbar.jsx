import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineMobile, AiOutlineHeart } from "react-icons/ai";
import { BsSearch, BsBag } from "react-icons/bs";
import { SlUser } from "react-icons/sl";
import { HiMenuAlt1 } from "react-icons/hi";
import {
  IconButton,
  InputGroup,
  InputLeftAddon,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import LOGO from "../assets/befoure-logo.svg";
import {
  getTokenFromCookies,
  isTokenExpired,
  removeTokenFromCookies,
} from "../utils/token.utils";
import { FaShoppingCart } from "react-icons/fa";
import useGetCurrentPath from "../hooks/useGetCurrentPath";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const { totalCartProduct } = useSelector((store) => store.cartReducer);
  const { user } = useSelector((store) => store.authReducer);
  console.log(user,"user")
  const currentPath = useGetCurrentPath();

  const token = getTokenFromCookies();
  const isTokenExpire = isTokenExpired(token);

  useEffect(() => {
    if (isTokenExpire) {
      removeTokenFromCookies();
    }
    if (
      (token && currentPath === "/user/login") ||
      (token && currentPath === "/user/register")
    ) {
      navigate(-1);
    }
  }, [navigate, isTokenExpire, token, currentPath]);

  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const onMenPage = () => {
    navigate("/men");
  };
  const onWomenPage = () => {
    navigate("/women");
  };

  const onLoginPage = () => {
    navigate("/user/login");
  };

  const onCartPage = () => {
    navigate("/cart");
  };

  const onWishlistPage = () => {
    navigate("/wishlist");
  };

  const onHomePage = () => {
    navigate("/");
  };

  const onSigupPage = () => {
    navigate("/user/register");
  };

  const handleLogout = () => {
    removeTokenFromCookies();
    navigate("/user/login");
  };

  return (
    <>
      <nav>
        <div id="nav-top">
          <div id="top-sec">
            <div id="top-1">
              <ul>
                <li>Offers</li>
                <li>Fanbook</li>
                <li>
                  {" "}
                  <AiOutlineMobile /> Download App
                </li>
                <li>TriBe Membership</li>
              </ul>
            </div>
            <div id="top-2">
              <ul>
                <li>Contact Us</li>
                <li>Track Order</li>
              </ul>
            </div>
          </div>
        </div>
        <div id="nav-bottom">
          <div id="nav-bottom-in">
            <div id="nav-bottom-in-1">
              <div id="logo" onClick={onHomePage}>
                <img src={LOGO} alt="befour.com" />
              </div>
            </div>
            <div id="nav-bottom-in-2">
              {/* <ul> */}
              <li onClick={onMenPage}>MEN</li>
              <li onClick={onWomenPage}>WOMEN</li>
              {/* </ul> */}
            </div>
            <div id="nav-bottom-in-3">
              <div id="search">
                <InputGroup>
                  <InputLeftAddon>
                    <BsSearch />
                  </InputLeftAddon>
                  <Input type="search" placeholder="Seach Products here..." />
                </InputGroup>
              </div>
              <div id="func">
                <ul>
                  {/* <li onClick={onLoginPage}>Login</li> */}
                  <li onClick={onWishlistPage}>
                    <AiOutlineHeart style={{ fontSize: "25px" }} />
                  </li>
                  <li className="cart-icon" onClick={onCartPage}>
                    <FaShoppingCart className="icon-grey" />
                    {token ? (
                      <span className="badge">{totalCartProduct}</span>
                    ) : (
                      <span className="badge">{0}</span>
                    )}
                  </li>
                  <li>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<SlUser />}
                        variant="outline"
                      ></MenuButton>
                      <MenuList>
                        {!token && (
                          <MenuItem onClick={onSigupPage}>Signup</MenuItem>
                        )}

                        {!token && (
                          <MenuItem onClick={onLoginPage}>Login</MenuItem>
                        )}
                        {/* {token && <MenuItem>My Order </MenuItem>} */}
                        {/* {token && <MenuItem>My Wishlist </MenuItem>} */}
                        {token && <MenuItem>{user?.email} </MenuItem>}

                        <MenuDivider />
                        {/* <MenuGroup title="Not For User"> */}
                        {/* <MenuItem>Become Seller</MenuItem> */}
                        {/* <MenuItem>Admin Login</MenuItem> */}
                        {/* </MenuGroup> */}
                        {token && (
                          <Button variant={"solid"} onClick={handleLogout}>
                            Logout
                          </Button>
                        )}
                      </MenuList>
                    </Menu>
                  </li>
                </ul>
              </div>
            </div>
            <div id="menu-btn">
              <HiMenuAlt1 onClick={handleToggle} />
            </div>
            {showSidebar && (
              <div id="sideMenu">
                <ul id="sideList">
                  <li onClick={onMenPage}>MEN</li>
                  <li onClick={onWomenPage}>WOMEN</li>
                  <li>WISHLIST</li>
                  <li onClick={onCartPage}>CART</li>
                  <li>
                    <Link to="/#">PROFILE</Link>
                  </li>
                  {token ? (
                    <li onClick={handleLogout}>LOGOUT</li>
                  ) : (
                    <li>LOGIN</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
