const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que db.js apunte a tu base de datos correcta

// POST: Crear una nueva configuración de sesión
router.post("/", async (req, res) => {
    // Extraemos los datos que envía Unity (SimpleSessionData)
    const {
        paciente_id,
        duracion,
        enemigos,
        cadencia,
        velocidad
    } = req.body;

    console.log("📦 Recibido POST /sessions:", req.body);

    // Validación simple
    if (!paciente_id) {
        return res.status(400).json({ success: false, error: "Falta paciente_id" });
    }

    try {
        // NOTA: Cambia 'Sesiones_Simple' por el nombre real de tu tabla nueva si es diferente.
        // Asegúrate que las columnas coincidan con las de tu tabla.
        const query = `
            INSERT INTO Sesiones_Simple 
            (paciente_id, duracion, total_enemigos, cadencia, velocidad)
            VALUES (?, ?, ?, ?, ?)
        `;

        // Ejecutar query con los valores. Si velocidad viene vacía, usamos 5.0 por defecto.
        const [result] = await db.query(query, [
            paciente_id,
            duracion,
            enemigos,
            cadencia,
            velocidad || 5.0
        ]);

        console.log("✅ Insertado ID:", result.insertId);
        res.json({ success: true, id: result.insertId, message: "Configuración guardada." });

    } catch (error) {
        console.error("❌ Error SQL:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;