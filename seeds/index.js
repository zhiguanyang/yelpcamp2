const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '640fdb1d76bf0919eff6aa30',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point',
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
                ]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nesciunt reiciendis, velit ratione incidunt odio tenetur similique a quisquam tempore vitae eius quaerat neque impedit accusantium sapiente magnam laborum distinctio',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dp1408ac1/image/upload/v1679255117/YelpCamp/jsaz6nse8d6jbcd09wk1.jpg',
                    filename: 'YelpCamp/jsaz6nse8d6jbcd09wk1'
                },
                {
                    url: 'https://res.cloudinary.com/dp1408ac1/image/upload/v1679255117/YelpCamp/rw18rxjousa5wdu9usfj.jpg',
                    filename: 'YelpCamp/rw18rxjousa5wdu9usfj'
                }
            ],
            
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})