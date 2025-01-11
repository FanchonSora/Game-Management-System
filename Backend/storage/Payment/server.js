const express = require("express");
const stripe = require("stripe")("your-secret-key-from-stripe");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/your-server-endpoint/payment", async (req, res) => {
  const { token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: 1000,
      currency: "usd",
      description: "Payment for your order",
      source: token,
    });

    res.json({ success: true, charge });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
