const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 8080;
const mongoose = require("mongoose");
const Product = require("./Product");

app.use(express.json());
mongoose.connect(
    "mongodb://35.234.124.208/products",
    {
        useNewUrlParser: true
    }
)
    .then(() => {
        console.log(`Products DB Connected`);
    })
    .catch((error) => {
        console.error(`Error connecting to Products DB: ${error}`);
    });

app.post("/product/buy", async (req, res) => {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
    return res.json(products);
});

app.post("/product/create", async (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
    });
    await newProduct.save();
    return res.json(newProduct);
});

app.listen(PORT, () => {
    console.log(`Product Service at ${PORT}`);
});
