const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /pacientes/:fisioterapeuta_id
// Consulta los pacientes asociados a la gestión de fisioterapeutas.
router.get('/:fisioterapeuta_id', (req, res) => {
    const { fisioterapeuta_id } = req.params;
    console.log(`[API] Buscando pacientes para Fisio ID: ${fisioterapeuta_id}`);

    const query = `
        SELECT paciente_id, nombre, apellidos, email, telefono, fisioterapeuta_asignado_id 
        FROM Pacientes
        -- WHERE fisioterapeuta_asignado_id = ? 
    `;

    // El parámetro se mantiene preparado para aplicar el filtro por fisioterapeuta.
    db.query(query, [fisioterapeuta_id], (err, results) => {
        if (err) {
            console.error("Error en GET /pacientes:", err);
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// POST /pacientes/nuevo
// Crea un nuevo registro de paciente y lo asocia a un fisioterapeuta.
router.post('/nuevo', (req, res) => {
    const { nombre, apellidos, email, fisioterapeuta_asignado_id } = req.body;

    const query = `
        INSERT INTO Pacientes (nombre, apellidos, email, fisioterapeuta_asignado_id)
        VALUES (?, ?, ?, ?)
    `;

    // Los valores se pasan como parámetros separados de la consulta SQL.
    db.query(query, [nombre, apellidos, email, fisioterapeuta_asignado_id], (err, result) => {
        if (err) {
            console.error("Error creando paciente:", err);
            return res.status(500).json({ success: false, error: err.message });
        }

        res.json({ success: true, id: result.insertId });
    });
});

module.exports = router;