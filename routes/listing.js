const { required } = require("joi");

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


// multer require
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


//controllers  listing require
const { index, renderNewForm, showListing, createListing, updateListing, deleteListing, renderEditForm } = require("../controllers/listing.js");







// INDEX ROUTE
router.get("/", wrapAsync(index));



// NEW ROUTE
router.get("/new", isLoggedIn, renderNewForm);



// SHOW ROUTE
router.get("/:id", wrapAsync(showListing));



// CREATE ROUTE
router.post("/",  isLoggedIn,   upload.single('listing[image]'), validateListing, wrapAsync(createListing));
// router.post("/", upload.single('listing[image]'), (req, res) => {
//     res.send(req.file);
//     // console.log(req.file);
//     // console.log("done");
    
// });

// validateListing,

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));



//UPDATE ROUTE
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(updateListing));



// DELETE ROUTE
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing))


module.exports = router;   