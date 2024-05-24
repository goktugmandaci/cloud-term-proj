const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 9090;
const mongoose = require("mongoose");
const Order = require("./Order");

mongoose.connect(
    "mongodb://35.234.124.208/orders",
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

app.post("/order/create", async (req, res) => {
    try {
        const { products, userEmail } = req.body;

        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total += products[i].price;
        }

        const newOrder = new Order({
            products,
            user: userEmail,
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


app.delete("/order/:id", async (req, res) => {
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