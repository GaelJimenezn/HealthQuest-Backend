const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: Guardar configuración simple (Sin puntaje)
router.post("/", async (req, res) => {
    const {
        paciente_id,
        duracion,
        enemigos,
        cadencia,
        velocidad
    } = req.body;

    if (!paciente_id) {
        return res.status(400).json({ error: "Falta paciente_id" });
    }

    console.log(`📝 Guardando Configuración para Paciente ${paciente_id}`);

    try {
        const query = `
            INSERT INTO Sesiones_Simple 
            (paciente_id, duracion, total_enemigos, cadencia, velocidad)
            VALUES (?, ?, ?, ?, ?)
        `;

        await db.query(query, [
            paciente_id,
            duracion,
            enemigos,
            cadencia,
            velocidad
        ]);

        res.json({ success: true, message: "Configuración guardada correctamente." });

    } catch (error) {
        console.error("❌ Error SQL:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;