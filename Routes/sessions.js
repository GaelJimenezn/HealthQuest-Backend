const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /sessions
// Creates a new game session with its initial configuration.
router.post('/', (req, res) => {
    const {
        paciente_id,
        duracion,
        enemigos,
        cadencia,
        velocidad
    } = req.body;

    console.log("Recibida petición de sesión:", req.body);

    // Store the session configuration in MySQL.
    const query = `
        INSERT INTO Sesiones_Simple 
        (paciente_id, duracion, total_enemigos, cadencia, velocidad, fecha) 
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    db.query(query, [paciente_id, duracion, enemigos, cadencia, velocidad], (err, result) => {
        if (err) {
            console.error("Error al insertar sesión en BD:", err);
            return res.status(500).json({ error: err.message });
        }

        console.log("Sesión creada con ID:", result.insertId);

        res.status(200).json({
            success: true,
            id: result.insertId,
            message: "Sesión configurada correctamente"
        });
    });
});

// Session results are updated through Routes/resultados.js.
module.exports = router;
