require('dotenv').config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// --- RUTAS ---
const rutas = [
    "/sessions",
    "/resultados",
    "/login",
    "/pacientes"
];

rutas.forEach(ruta => {
    app.use(ruta, require(`./Routes${ruta}`));
});

// ⬇ Puerto dinámico de Railway ⬇
const PORT = process.env.PORT || 3000;

// Log único verificando que todos los archivos existen
const rutasCargadas = rutas.every(ruta =>
    fs.existsSync(`./Routes${ruta}.js`)
);

console.log("Rutas cargadas correctamente:", rutasCargadas ? "✔️" : "❌", rutas);

app.listen(PORT, () => {
    console.log("API RUNNING ON PORT " + PORT);
});
