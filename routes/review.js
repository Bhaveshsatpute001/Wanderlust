const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const { reviewSchema } = require("../schema.js");
// const Review = require("../models/review.js");

const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


// controller review require
const { createReview, deleteReview } = require("../controllers/review.js");



// post reviews route

router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));


// Delete Review Route

router.delete("/:reviewId", isLoggedIn, isReviewAuthor,  wrapAsync(deleteReview));


  

module.exports = router;