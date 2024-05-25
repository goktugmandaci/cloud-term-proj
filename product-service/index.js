const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 8080;
const mongoose = require("mongoose");
const Product = require("./Product");

app.use(express.json());

app.use(cors());

mongoose.connect(
    "mongodb://34.107.6.232/products",
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

app.post("/products/create", async (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
    });
    await newProduct.save();
    return res.json(newProduct);
});

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product", error });
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error });
    }
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
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
