const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT_ONE || 9090;
const mongoose = require("mongoose");
const Order = require("./Order");

mongoose.connect(
    "mongodb://34.107.6.232/orders",
    {
        useNewUrlParser: true
    }
)
    .then(() => {
        console.log(`Orders DB Connected`);
    })
    .catch((error) => {
        console.error(`Error connecting to Orders DB: ${error}`);
    });

app.use(express.json());

app.use(cors());

app.post("/orders/create", async (req, res) => {
    try {
        const { products, username } = req.body;

        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total += products[i].price;
        }

        const newOrder = new Order({
            products,
            user: username,
            total_price: total
        });

        await newOrder.save();

        return res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Error creating order" });
    }
});

app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        return res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Error fetching orders" });
    }
});


app.delete("/orders/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ message: "Error deleting order" });
    }
});

app.listen(PORT, () => {
    console.log(`Order Service at ${PORT}`);
});
