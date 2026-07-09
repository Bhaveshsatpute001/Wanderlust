const mongoose = require("mongoose");
const Review = require("./review");
const { type } = require("../schema");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
  


    image: {
        url: String,
        filename: String,
    },




    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});


listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;





// _id: ObjectId('699c29e4352b0e0458115ca6'),
// title: 'Cozy Beachfront Cottage',
// description: 'Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.',
// image: {
//   filename: 'listingimage',
//   url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
//   _id: ObjectId('699c29e4352b0e0458115ca7')
// },
// price: 15,
// location: 'Malibu',
// country: 'United States',