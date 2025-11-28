const express = require("express");
const router = express.Router();
const db = require("../db");

// GET: Obtener sesión por ID
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM Sesiones WHERE id_sesion = ?",
            [req.params.id]
        );
        res.json(rows[0] || {});
    } catch (err) {
        console.error("❌ Error en DB:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// POST: Guardar nueva sesión (LO QUE FALTABA)
router.post("/", async (req, res) => {
    console.log("📥 Guardando sesión:", req.body);

    // Extraemos los datos que envía Unity
    const {
        paciente_id,
        puntuacion_total,
        rango_maximo_alcanzado,
        duracion_sesion,
        velocidad_enemigos_sesion,
        ejercicio
    } = req.body;

    try {
        // NOTA: NO incluimos 'id_sesion' aquí, es AUTO_INCREMENT
        const query = `
            INSERT INTO Sesiones 
            (paciente_id, puntuacion_total, rango_maximo_alcanzado, duracion_sesion, velocidad_enemigos_sesion, ejercicio, fecha_ini)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;

        // Ejecutamos la query
        const [result] = await db.query(query, [
            paciente_id,
            puntuacion_total,
            rango_maximo_alcanzado,
            duracion_sesion,
            velocidad_enemigos_sesion,
            ejercicio || "General" // Valor por defecto si viene vacío
        ]);

        console.log("✅ Sesión guardada con ID:", result.insertId);
        res.json({ success: true, id_sesion: result.insertId });

    } catch (err) {
        console.error("❌ Error al insertar:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;