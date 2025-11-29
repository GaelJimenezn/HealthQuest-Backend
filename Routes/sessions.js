const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. POST: Crear la sesión inicial (Configuración)
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

    console.log(`📝 Creando sesión para Paciente ${paciente_id}`);

    try {
        const query = `
            INSERT INTO Sesiones_Simple 
            (paciente_id, duracion, total_enemigos, cadencia, velocidad, fecha_registro)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;

        const [result] = await db.query(query, [
            paciente_id,
            duracion,
            enemigos,
            cadencia,
            velocidad
        ]);

        // Devolvemos el ID de la sesión creada para que Unity lo guarde
        res.json({ success: true, id: result.insertId, message: "Sesión creada." });

    } catch (error) {
        console.error("❌ Error SQL POST:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ---------------------------------------------------------
// 2. PUT: Actualizar resultados al finalizar (ESTO ES LO QUE TE FALTA)
// ---------------------------------------------------------
router.put("/:id", async (req, res) => {
    const { id } = req.params; // El ID de la sesión (ej: 55)
    const {
        puntaje_izquierdo,
        puntaje_derecho,
        precision
    } = req.body;

    console.log(`[API] Guardando resultados para Sesión ID: ${id}`);

    try {
        const query = `
            UPDATE Sesiones_Simple 
            SET puntaje_izquierdo = ?, puntaje_derecho = ?, \`precision\` = ?
            WHERE sesion_id = ?
        `;

        const [result] = await db.query(query, [
            puntaje_izquierdo,
            puntaje_derecho,
            precision,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Sesión no encontrada en BD" });
        }

        res.json({ success: true, message: "Resultados guardados correctamente" });

    } catch (error) {
        console.error("❌ Error SQL PUT:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;