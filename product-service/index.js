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


app.delete("/product/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const deletedProduct = await Product.findOne({ name });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product", error });
    }
});


app.get("/product", async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error });
    }
});


app.get("/product/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const product = await Product.findOne({ name });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching product", error });
    }
});

app.listen(PORT, () => {
    console.log(`Product Service at ${PORT}`);
});