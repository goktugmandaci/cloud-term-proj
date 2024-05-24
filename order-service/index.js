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

function createOrder(products, userEmail) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total,
    });
    newOrder.save();
    return newOrder;
}

app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});
