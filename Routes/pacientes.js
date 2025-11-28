// Backend/Routes/pacientes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Importamos la conexión a la BD

// GET: Obtener pacientes por ID de fisio
router.get('/:fisioterapeuta_id', async (req, res) => {
    const { fisioterapeuta_id } = req.params;
    console.log(`[API] Buscando pacientes para Fisio ID: ${fisioterapeuta_id}`);

    try {
        // NOTA: Quitamos el WHERE temporalmente para que VEAS los datos
        // Cuando ya funcione, puedes volver a poner: WHERE fisioterapeuta_asignado_id = ?
        const query = `
            SELECT paciente_id, nombre, apellidos, email, telefono, fisioterapeuta_asignado_id 
            FROM Pacientes
        `;

        // Si usas mysql2 con promesas (que es lo normal):
        const [rows] = await db.query(query);

        res.json(rows);

    } catch (error) {
        console.error("Error en GET /pacientes:", error);
        res.status(500).json({ error: error.message });
    }
});

// POST: Crear paciente nuevo
router.post('/nuevo', async (req, res) => {
    const { nombre, apellidos, email, fisioterapeuta_asignado_id } = req.body;

    try {
        const query = `
            INSERT INTO Pacientes (nombre, apellidos, email, fisioterapeuta_asignado_id)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [nombre, apellidos, email, fisioterapeuta_asignado_id]);

        res.json({ success: true, id: result.insertId });

    } catch (error) {
        console.error("Error creando paciente:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;