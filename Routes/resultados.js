const express = require('express');
const router = express.Router();
const db = require('../db');

// RUTA: PUT /resultados/:id
// OBJETIVO: Actualizar los puntajes al final del juego.
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

    console.log(`[API] Fin de juego: Guardando datos en sesión existente ID ${id}`);

    try {
        // Usamos UPDATE. Si el ID ya existe, lo edita. Si no existe, no hace nada.
        // NUNCA creará una fila nueva.
        const query = `
            UPDATE Sesiones 
            SET puntaje_izquierdo = ?, puntaje_derecho = ?, precision_total = ?
            WHERE sesion_id = ?
        `;

        const [result] = await db.query(query, [puntaje_izquierdo, puntaje_derecho, precision, id]);

        if (result.affectedRows === 0) {
            console.warn(`[API] Alerta: Se intentó actualizar la sesión ${id} pero no existe.`);
            return res.status(404).json({ error: "Sesión no encontrada" });
        }

        res.json({ success: true, message: "Resultados actualizados correctamente" });

    } catch (error) {
        console.error("Error guardando resultados:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;