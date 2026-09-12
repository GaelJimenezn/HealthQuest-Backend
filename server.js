// Load environment variables from .env when running locally.
require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from the frontend and parse JSON request bodies.
app.use(cors());
app.use(express.json());

// --- API ROUTES ---
// Authentication and application data are split into independent routers.
app.use("/login", require("./Routes/login"));
app.use("/pacientes", require("./Routes/pacientes"));
app.use("/sessions", require("./Routes/sessions"));
app.use("/resultados", require("./Routes/resultados"));

// Railway and other hosting platforms provide PORT through the environment.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API RUNNING ON PORT " + PORT);

    // Development checks to confirm the expected route files are available.
    console.log("Ruta Login: ", require('fs').existsSync("./Routes/login.js"));
    console.log("Ruta Sessions: ", require('fs').existsSync("./Routes/sessions.js"));
    console.log("Ruta Resultados: ", require('fs').existsSync("./Routes/resultados.js"));
});
