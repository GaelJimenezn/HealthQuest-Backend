const express = require('express');
const router = express.Router();
const db = require('../db');

// PUT /resultados/:id
// Actualiza las métricas obtenidas durante una sesión de rehabilitación.
router.put('/:id', (req, res) => {
    const sessionId = req.params.id;

    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

    console.log(`[API] Guardando resultados Sesión ${sessionId}:`, req.body);

    // Actualiza únicamente la sesión indicada por su ID.
    const query = `
        UPDATE Sesiones_Simple  
        SET puntaje_izquierdo = ?, puntaje_derecho = ?, \`precision\` = ?
        WHERE id = ?
    `;

    db.query(query, [puntaje_izquierdo, puntaje_derecho, precision, sessionId], (err, result) => {
        if (err) {
            console.error("[API] Error Update:", err);
            return res.status(500).json({ error: err.message });
        }

        // Si no se modificó ninguna fila, la sesión solicitada no existe.
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró la sesión con ese ID" });
        }

        res.status(200).json({ success: true, message: "Resultados actualizados" });
    });
});

module.exports = router;