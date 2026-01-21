const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const BACKEND_URL = process.env.BACKEND_URL || "http://flask-backend-service:8000";

app.get("/", (req, res) => {
  res.render("index", { message: null });
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/submit`, {
      name: req.body.name,
      email: req.body.email
    });

    res.render("index", { message: response.data.message });
  } catch (err) {
    res.render("index", { message: "Error submitting data" });
  }
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});
