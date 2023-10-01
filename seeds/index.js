const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connetion error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64d29040fa2d1577782ae277",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae facilis minus assumenda cupiditate tempore quas enim, ratione officiis suscipit maiores qui nihil ipsa tenetur labore facere iusto dolor quam ab.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/drvtzcr23/image/upload/v1692989573/YelpCamp/cnfbpqsyztomagono2ca.jpg",
          filename: "YelpCamp/cnfbpqsyztomagono2ca",
        },
        {
          url: "https://res.cloudinary.com/drvtzcr23/image/upload/v1692989573/YelpCamp/viz7ewoep4ohg1ygtprp.jpg",
          filename: "YelpCamp/viz7ewoep4ohg1ygtprp",
        },
      ],
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
