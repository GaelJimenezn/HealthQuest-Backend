require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// --- RUTAS ---
app.use("/sessions", require("./Routes/sessions"));     // Solo para CREAR (Inicio)
app.use("/resultados", require("./Routes/resultados")); // Solo para ACTUALIZAR (Fin)
app.use("/login", require("./Routes/login"));
app.use("/pacientes", require("./Routes/pacientes"));

// ⬇ Puerto dinámico de Railway ⬇
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API RUNNING ON PORT " + PORT);
    console.log("Ruta de Resultados cargada: ", require('fs').existsSync("./Routes/resultados.js"));
});