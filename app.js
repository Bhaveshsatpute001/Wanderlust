// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config();
// }

 require('dotenv').config();


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
// const { listingSchema, reviewSchema } = require("./schema.js");
// const review = require("./models/review.js");
// const Review = require("./models/review.js");


const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


// // cookie parser
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getcookies", (req, res) => {
//     // res.cookie("greet", "Hello ji");
//     // res.cookie("madeIN", "India");
//     // res.cookie("color", "yellow");
//     res.cookie("name", "bhavesh", { signed: true});
//     // console.log(req.cookies);
//     res.send("sent you some cookies");

// });


// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verifed");
// });


// app.get("/name", (req, res) => {
//     let {name} = req.cookies;
//     res.send(`hi, ${name}`);
// });

















const listingRouter = require("./routes/listing.js");
// const review = require("./models/review.js");

const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const cookie = require("express-session/session/cookie.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,  // set expires 7 day after
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};



// app.get("/", (req, res) => {
//     console.log(req.cookies);
//     res.send("Hi, I am root ttttttttttttt");
// });



app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(res.locals.success);
    next();
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter);
 
app.get("/testListing", wrapAsync(async (req, res) => {
    //     let sampleListing = new Listing({
    //         title: "My New Villa",`
    //         description: "By the beach",
    //         price: 12000,
    //         location: "Calangute, Goa", 
    //         country: "India"
    //     });

    // await sampleListing.save();
    // console.log("sample was save");
    res.send("successful testing");
}));




app.use((req, res, next) => {
    next(new ExpressError(404, "page not found!"));
});
app.use((err, req, res, next) => {
    console.log(err);// this is show error in console
    let { statusCode = 500, message = "Something went wrong!" } = err;

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid Listing ID!";
    }

    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", { message });
});



app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});