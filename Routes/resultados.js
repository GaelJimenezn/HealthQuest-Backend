const express = require('express');
const router = express.Router();
const db = require('../db');

// PUT /resultados/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

    console.log(`[API] Guardando Resultados en Sesión ID: ${id}`);

    try {
        // ⚠️ CAMBIO AQUÍ: Nombre de la tabla actualizado a 'sesiones_simple'
        const query = `
            UPDATE Sesiones_Simple 
            SET puntaje_izquierdo = ?, puntaje_derecho = ?, precision_total = ?
            WHERE sesion_id = ?
        `;

        const [result] = await db.query(query, [puntaje_izquierdo, puntaje_derecho, precision, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Sesión no encontrada o ID inválido" });
        }

        res.json({ success: true, message: "Guardado con éxito" });

    } catch (error) {
        console.error("Error en PUT /resultados:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;