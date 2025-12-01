const express = require('express');
const router = express.Router();
const db = require('../db'); // Importamos la conexión (modo callback)

// GET: Obtener pacientes por ID de fisio
router.get('/:fisioterapeuta_id', (req, res) => {
    const { fisioterapeuta_id } = req.params;
    console.log(`[API] Buscando pacientes para Fisio ID: ${fisioterapeuta_id}`);

    // NOTA: Mantenemos tu lógica. Si quieres filtrar, descomenta el WHERE.
    const query = `
        SELECT paciente_id, nombre, apellidos, email, telefono, fisioterapeuta_asignado_id 
        FROM Pacientes
        -- WHERE fisioterapeuta_asignado_id = ? 
    `;

    // CAMBIO CRÍTICO: Usamos callback (err, results) en lugar de await
    db.query(query, [fisioterapeuta_id], (err, results) => {
        if (err) {
            console.error("Error en GET /pacientes:", err);
            return res.status(500).json({ error: err.message });
        }

        // results ya es el array de filas, no hace falta desestructurar [rows]
        res.json(results);
    });
});

// POST: Crear paciente nuevo
router.post('/nuevo', (req, res) => {
    const { nombre, apellidos, email, fisioterapeuta_asignado_id } = req.body;

    const query = `
        INSERT INTO Pacientes (nombre, apellidos, email, fisioterapeuta_asignado_id)
        VALUES (?, ?, ?, ?)
    `;

    // CAMBIO CRÍTICO: Usamos callback aquí también
    db.query(query, [nombre, apellidos, email, fisioterapeuta_asignado_id], (err, result) => {
        if (err) {
            console.error("Error creando paciente:", err);
            return res.status(500).json({ success: false, error: err.message });
        }

        res.json({ success: true, id: result.insertId });
    });
});

module.exports = router;