const express = require('express');
const router = express.Router();
const db = require('../db');

// --- RUTA POST (Crear Sesión) ---
// URL final: https://.../sessions
router.post('/', (req, res) => {
    const {
        paciente_id,
        duracion,
        enemigos,
        cadencia,
        velocidad
    } = req.body;

    console.log("Recibida petición de sesión:", req.body);

    const query = `
        INSERT INTO sessions 
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

// NOTA: La ruta PUT de resultados se maneja en 'Routes/resultados.js'
// No la pongas aquí para evitar duplicados y errores de ruta.

module.exports = router;