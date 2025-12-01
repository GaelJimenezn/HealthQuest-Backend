const express = require('express');
const router = express.Router();
const db = require('../db');

router.put('/:id', (req, res) => {
    const sessionId = req.params.id;

    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

    console.log(`[API] Guardando resultados Sesión ${sessionId}:`, req.body);

    const query = `
        UPDATE sessions 
        SET puntaje_izquierdo = ?, puntaje_derecho = ?, \`precision\` = ?
        WHERE id = ?
    `;

    db.query(query, [puntaje_izquierdo, puntaje_derecho, precision, sessionId], (err, result) => {
        if (err) {
            console.error("[API] Error Update:", err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró la sesión con ese ID" });
        }

        res.status(200).json({ success: true, message: "Resultados actualizados" });
    });
});

module.exports = router;