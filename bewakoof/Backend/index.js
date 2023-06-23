const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const { auth } = require("../Backend/middlewares/auth")
const { connection } = require("./config/db");
const cookieSession = require("cookie-session");

const {setupGoogleStrategy}=require("./config/google.auth")

const { productRouter } = require("./routes/products.routes");
const { userRouter } = require("./routes/user.routes");
const { CartproductRouter } = require("./routes/cartProducts.routes");
const { orderRouter } = require("./routes/orderList.routes");


const passport=require("passport");

const app = express()

app.use(
  cookieSession({
    name: "session",
    keys: ["secret-key"],
    maxAge: 5 * 60 * 1000, // Cookie expiration time (1 minute)
  })
);
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(cors())

setupGoogleStrategy(passport)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email","phone"] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {  
    // Successful authentication, redirect home.
    console.log(req.user);
    res.json(req.user);
    res.redirect('/');
  });

app.use("/user", userRouter)

app.use("/products", productRouter)
app.use("/cart", CartproductRouter)
app.use("/order" , orderRouter)




app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log( "Connected to MongoDb")

    } catch (error) {
        console.log("Cannot connect to MongoDb")
    }
    console.log(`Server running on port ${process.env.PORT}`)
})




