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
        return res.status(500).json({ message: "Error registering user" });
    }
});

app.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Error deleting user" });
    }
});

app.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users" });
    }
});


app.get("/user/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Error fetching user" });
    }
});

app.listen(PORT, () => {
    console.log(`User Service at ${PORT}`);
});
