const User = require("../models/user");


module.exports.renderSignupForm = (req, res) => {
    // console.log("signup");
    res.render("users/signup.ejs");
};


module.exports.signup = async (req, res) => {


    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "WelCome to WanderLust !");
            res.redirect("/listings");


        });

    } catch (e) {

        req.flash("error", e.message);
        console.log(e);
        res.redirect("/signup")


    }

};



module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};


module.exports.login = async (req, res) => {
        req.flash("success", "WelCome back to WanderLust ");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect( redirectUrl);
        // console.log( req.session.redirectUrl);
        // res.redirect("/listings");
      
    };



module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    })
};