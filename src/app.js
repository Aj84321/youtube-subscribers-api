
const express = require('express');
const app = express()
const path = require('path')
const subscriberModel = require("./models/subscribers");


// Display the written message on the homepage to the client.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/home/index.html'))
  })
// 1. Get an array of all subscribers from the database
app.get("/channels", async (req, res) => {
  const subscribers = await subscriberModel.find().select("-__v");
  res.json(subscribers);
});
// 2. Get an array of subscriber's name and subscribed channel from the database
app.get("/channels/names", async (req, res) => {
  const subscribers = await subscriberModel
    .find()
    .select("-_id -subscribedDate -__v");
  res.json(subscribers);
});
// 3. Get a particular subscriber from the database using _id
app.get("/channels/:id", async (req, res) => {
  const id = req.params.id;
  await subscriberModel
    .findById(id)
    .select("-__v")
    .then((data) => {
      if (!data) {
        // When the subscriber is not found for the given id.
        error = Error(`Channel doesn't exist with the given _id: ${id}.`);
        res.status(400).json({ message: error.message });
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      // When the id is not entered in the correct format.
      res.status(400).json({
        message: `Channel doesn't exist with the given _id: ${id}.`,
      });
    });
});
// Handles all the unwanted requests.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
