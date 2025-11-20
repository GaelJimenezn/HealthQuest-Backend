const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:id", async (req, res) => {

    console.log("🔥 Llegó petición GET /sessions/" + req.params.id);

    try {
        const [rows] = await db.query(
            "SELECT * FROM Sesiones WHERE id_sesion = ?",
            [req.params.id]
        );

        console.log("📦 Resultado desde MySQL:", rows);

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(rows[0] || {}, null, 4));

    } catch (err) {
        console.error("❌ Error en DB:", err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
