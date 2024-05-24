const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 7070;
const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(
    "mongodb://35.234.124.208/customers",
    {
        useNewUrlParser: true
    }
)
    .then(() => {
        console.log(`Customers DB Connected`);
    })
    .catch((error) => {
        console.error(`Error connecting to Customers DB: ${error}`);
    });


app.use(express.json());

app.post("/auth/register", async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({
            name,
            email,
        });
        await newUser.save();
        return res.json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
    }
});

app.listen(PORT, () => {
    console.log(`User Service at ${PORT}`);
});
