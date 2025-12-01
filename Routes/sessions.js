const express = require('express');
const router = express.Router();
const db = require('../db');

// --- RUTA POST (Crear Sesión) ---
router.post('/', (req, res) => {
    // 1. Recibimos los datos (SimpleSessionData de Unity)
    const {
        paciente_id,
        duracion,   // En C# es 'duracion'
        enemigos,   // En C# es 'enemigos'
        cadencia,
        velocidad
    } = req.body;

    console.log("Recibida petición de sesión:", req.body); // Log para depurar

    // 2. Preparamos la consulta SQL
    // Mapeamos 'enemigos' (JSON) a 'total_enemigos' (Tabla)
    // Usamos 'duracion' (JSON) para 'duracion' (Tabla)
    const query = `
        INSERT INTO sessions 
        (paciente_id, duracion, total_enemigos, cadencia, velocidad, fecha) 
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    // 3. Ejecutamos la consulta
    db.query(query, [paciente_id, duracion, enemigos, cadencia, velocidad], (err, result) => {
        if (err) {
            console.error("Error al insertar sesión en BD:", err);
            return res.status(500).json({ error: err.message });
        }

        console.log("Sesión creada con ID:", result.insertId);

        // 4. Devolvemos el ID generado
        res.status(200).json({
            success: true,
            id: result.insertId,
            message: "Sesión configurada correctamente"
        });
    });
});

// --- RUTA PUT (Actualizar Resultados) ---
// Esta es la ruta para cuando termina el juego
router.put('/resultados/:id', (req, res) => {
    const sessionId = req.params.id;
    const { puntaje_izquierdo, puntaje_derecho, precision } = req.body;

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