const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /sessions
// Crea la sesión inicial en la tabla correcta
router.post('/', async (req, res) => {
    const { paciente_id, duracion, enemigos, cadencia, velocidad } = req.body;
    console.log(`[API] Creando Sesión para Paciente ID: ${paciente_id}`);

    try {
        // ⚠️ CAMBIO AQUÍ: Nombre de la tabla actualizado a 'sesiones_simple'
        // Verifica que las columnas (paciente_id, fecha, etc.) existan en esa tabla también.
        const query = `
            INSERT INTO Sesiones_Simple 
            (paciente_id, fecha, duracion_configurada, total_enemigos, cadencia_configurada, velocidad_configurada)
            VALUES (?, NOW(), ?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [paciente_id, duracion, enemigos, cadencia, velocidad]);

        res.json({ success: true, id: result.insertId });

    } catch (error) {
        console.error("Error en POST /sessions:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;