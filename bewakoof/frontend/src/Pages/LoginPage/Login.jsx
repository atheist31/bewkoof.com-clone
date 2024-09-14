import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useCustomToast from "../../hooks/useCustomToast";
import { login } from "../../Redux/Auth/action";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";

import { RiLockPasswordFill } from "react-icons/ri";
import SocialMedia from "../SingupPage/SocialMedia";
import Toast from "../../hooks/useCustomToast";
import { getTokenFromCookies } from "../../utils/token.utils";

//component start form here

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const showToast = useCustomToast();
  const token=getTokenFromCookies()
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const store = useSelector((store) => store.authReducer);
  const { isError, msg,isAuth,isLoading } = store;
  const navigate=useNavigate();
    const location=useLocation();
    const from=location.state;

  const [user, setUser] = useState({
    email: "", 
    password: "",
  });

  const { email, password } = user;

  const handleSignupForm = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  useEffect(() => {
    console.log(token);
    if (!isFirstRender.current) {
      if (isError) {
        showToast(msg, "error", 3000);
      } else if (isAuth) {
        showToast(msg, "success", 3000);
        const redirectPath = from ? from : "/";
        navigate(redirectPath, { replace: true });
      }
    } else {
      isFirstRender.current = false;
    }
  }, [isAuth,msg]);

  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const imageDisplay = useBreakpointValue({ base: "none", md: "block" });

  if (token) {
    // Redirect to current URL if token is present
    return <Navigate to={from} replace={true} />;
  }

 
  return (
    <div>
      <SimpleGrid
        className={styles.main}
        columns={[1,1,2, 2]}
        w={"80%"}
        margin={"auto"}
        gap={"10%"}
        mb={"100px"}
        mt={"10px"}
      >
        <div className={styles.leftside} style={{ display: imageDisplay }}>
          <img
            src="https://images.bewakoof.com/web/group-19-1617704502.png"
            alt="logo"
          />
        </div>
        <div>
          <header>
            <p>Log in </p>
            <p>for Latest trends, exciting offers and everything Bewakoof®!</p>
          </header>
          <form onSubmit={handleSignupForm}>
            <InputGroup mb={"2"}>
              <InputLeftAddon children={<MdEmail />} />
              <Input
                type="email"
                name="email"
                placeholder=" Email"
                variant={"flushed"}
                onChange={handleDataChange}
                value={email}
              />
            </InputGroup>
            <InputGroup mb={"2"}>
              <InputLeftAddon children={<RiLockPasswordFill />} />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" Password"
                variant={"flushed"}
                onChange={handleDataChange}
                value={password}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              New user?{" "}
              <Link
              to={"/user/register"}
                color={"blue.400"}
              >
                Signup
              </Link>
            </Text>
          </Stack>
          {/* <SocialMedia /> */}
        </div>
      </SimpleGrid>
    </div>
  );
};

export default Login;
