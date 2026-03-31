const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let orders = [
    {
        id: 1,
        customerName: "Ein Käufer",
        product: "Flyer",
        quantity: 250,
        status: "Neu"
    }
]

app.get("/api/orders", (req, res) => {
    res.json(orders);
});

app.post("/api/orders", (req, res) => {
    const { customerName, product, quantity } = req.body;

    if (!customerName || !product || !quantity) {
        return res.status(400).json({
            error: "Bitte customerName, product und quantity angeben."
        });
    }

    const newOrder = {
        id: Date.now(),
        customerName,
        product,
        quantity: Number(quantity),
        status: "Neu"
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});