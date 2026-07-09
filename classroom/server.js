const express = require("express");
const app = express();

const session = require("express-session");
const flash = require("connect-flash");
const { name } = require("ejs");
const path = require("path");


app.use(session({
    secret: "mysupersecretstring",
     resave: false,
      saveUninitialized: true,
    
    })
);
app.use(flash());



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));






app.get("/register", (req, res) => {
    console.log("fghjkk");
    let {name} = req.query;
    req.session.name = name;
    req.flash("success", "user register successfully");
    // req.flash("error", "user register successfully");
    res.redirect("/hello");
    // res.send(`name: ${name}`);
})



app.get("/hello", (req, res) => {

    console.log(req.flash("success"));
    res.render("page.ejs", {name: req.session.name,  msgE: req.flash("success")});
    // res.send(`hello ${req.session.name}`);
});


app.get("/reqcount", (req, res) => {
    // console.log(req.session.path);
    if(req.session.count){
        req.session.count
    }
    else{
        req.session.count = 1;
    }
    
    res. send(`you sent a request ${req.session.count}  times`);
});








// // cookie parser
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getcookies", (req, res) => {
//     // res.cookie("greet", "Hello ji");
//     res.cookie("madeIN", "India");
//     res.cookie("color", "yellow");
//     res.cookie("name", "bhavesh", { signed: true});
//     console.log(req.cookies);
//     res.send("sent you some cookies");

// });


// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verifed");
// });


// app.get("/name", (req, res) => {
//     // let {name} = req.cookies;
//     let {color} = req.cookies;
//     // res.send(`hi, ${name}`);
//     res.send(`hi, ${color}`);
// });

app.listen(8080, () => {
    console.log("Server is listeningttttttttt to port 8080");
});