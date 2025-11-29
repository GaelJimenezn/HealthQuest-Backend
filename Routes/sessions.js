const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. POST: CREAR SESIÓN (Al dar clic en "Jugar" o "Guardar")
router.post("/", async (req, res) => {
    const { paciente_id, duracion, enemigos, cadencia, velocidad } = req.body;

    if (!paciente_id) return res.status(400).json({ error: "Falta paciente_id" });

    try {
        // Intentamos insertar. Si falla por 'fecha_registro', la quitamos del query.
        const query = `
            INSERT INTO Sesiones_Simple 
            (paciente_id, duracion, total_enemigos, cadencia, velocidad, fecha_registro)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;

        const [result] = await db.query(query, [
            paciente_id, duracion, enemigos, cadencia, velocidad || 5.0
        ]);

        console.log(`✅ Sesión creada. ID: ${result.insertId}`);
        res.json({ success: true, id: result.insertId });

    } catch (error) {
        // Si el error es porque no existe la columna 'fecha_registro', reintentamos sin ella
        if (error.code === 'ER_BAD_FIELD_ERROR' && error.message.includes('fecha_registro')) {
            console.warn("⚠️ La columna 'fecha_registro' no existe. Insertando sin fecha...");
            const querySinFecha = `
                INSERT INTO Sesiones_Simple (paciente_id, duracion, total_enemigos, cadencia, velocidad)
                VALUES (?, ?, ?, ?, ?)
             `;
            const [retryResult] = await db.query(querySinFecha, [paciente_id, duracion, enemigos, cadencia, velocidad || 5.0]);
            res.json({ success: true, id: retryResult.insertId });
        } else {
            console.error("❌ Error SQL POST:", error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

// 2. PUT: GUARDAR RESULTADOS (Al terminar el juego)
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

    console.log(`📝 Guardando resultados en sesión ID ${id}...`);

    try {
        // CORRECCIÓN: Usamos 'id' en el WHERE, que es el estándar
        const query = `
            UPDATE Sesiones_Simple 
            SET puntaje_izquierdo = ?, puntaje_derecho = ?, \`precision\` = ?
            WHERE id = ?
        `;

        const [result] = await db.query(query, [
            puntaje_izquierdo,
            puntaje_derecho,
            precision,
            id
        ]);

        if (result.affectedRows === 0) {
            console.warn(`⚠️ No se encontró la sesión ID ${id} para actualizar.`);
            return res.status(404).json({ success: false, message: "Sesión no encontrada" });
        }

        console.log("✅ Resultados actualizados correctamente.");
        res.json({ success: true, message: "Resultados guardados" });

    } catch (error) {
        console.error("❌ Error SQL PUT:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;