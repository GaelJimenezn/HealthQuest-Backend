const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. POST: Crear sesión (Configuración)
router.post("/", async (req, res) => {
    const { paciente_id, duracion, enemigos, cadencia, velocidad } = req.body;

    if (!paciente_id) return res.status(400).json({ error: "Falta paciente_id" });

    console.log(`📝 Creando sesión para Paciente ${paciente_id}`);

    try {
        // NOTA: Si 'fecha_registro' te sigue dando error 500, bórralo de aquí y del VALUES
        const query = `
            INSERT INTO Sesiones_Simple 
            (paciente_id, duracion, total_enemigos, cadencia, velocidad, fecha_registro)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;

        const [result] = await db.query(query, [
            paciente_id, duracion, enemigos, cadencia, velocidad
        ]);

        // ¡IMPORTANTE! Devolver el ID
        res.json({ success: true, id: result.insertId });

    } catch (error) {
        console.error("❌ Error SQL POST:", error); // Mira la consola del servidor para ver el error real
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. PUT: Guardar resultados al final
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

    try {
        const query = `
            UPDATE Sesiones_Simple 
            SET puntaje_izquierdo = ?, puntaje_derecho = ?, \`precision\` = ?
            WHERE sesion_id = ?
        `;

        await db.query(query, [puntaje_izquierdo, puntaje_derecho, precision, id]);
        res.json({ success: true, message: "Resultados guardados" });

    } catch (error) {
        console.error("❌ Error SQL PUT:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;