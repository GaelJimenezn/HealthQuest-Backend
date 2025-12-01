const express = require('express');
const router = express.Router();
const db = require('../db');

// URL final: https://.../resultados/:id
router.put('/:id', (req, res) => {
    const sessionId = req.params.id;
    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

    console.log(`Guardando resultados para sesión ${sessionId}`, req.body);

    const query = `
        UPDATE sessions 
        SET puntaje_izquierdo = ?, puntaje_derecho = ?, precision = ?
        WHERE id = ?
    `;

    db.query(query, [puntaje_izquierdo, puntaje_derecho, precision, sessionId], (err, result) => {
        if (err) {
            console.error("Error actualizando resultados:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ success: true, message: "Resultados guardados" });
    });
});

module.exports = router;