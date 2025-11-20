require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/sessions", require("./Routes/sessions"));
app.use("/login", require("./Routes/login"));

// ⬇ Puerto dinámico de Railway ⬇
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API RUNNING ON PORT " + PORT);
    console.log("PORT env:", process.env.PORT);
});
