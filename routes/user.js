const express = require("express");
const router = express.Router();

const { Model } = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

// controller required
const { signup, renderSignupForm, renderLoginForm, login, logout } = require("../controllers/user");


router.get("/signup", renderSignupForm);



router.post("/signup", wrapAsync(signup));

router.get("/login", renderLoginForm);



router.post("/login", saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
    login
);


router.get("/logout", logout)


module.exports = router; 