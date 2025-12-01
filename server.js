require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// --- RUTAS ---
app.use("/login", require("./Routes/login"));
app.use("/pacientes", require("./Routes/pacientes"));
app.use("/sessions", require("./Routes/sessions"));      // Inicio del juego (POST)
app.use("/resultados", require("./Routes/resultados"));  // Fin del juego (PUT)

// ⬇ Puerto dinámico
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API RUNNING ON PORT " + PORT);
    // Logs de depuración para ver si carga los archivos
    console.log("Ruta Login: ", require('fs').existsSync("./Routes/login.js"));
    console.log("Ruta Sessions: ", require('fs').existsSync("./Routes/sessions.js"));
    console.log("Ruta Resultados: ", require('fs').existsSync("./Routes/resultados.js"));
});