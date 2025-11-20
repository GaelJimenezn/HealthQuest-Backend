// Routes/login.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query(
            "SELECT * FROM Usuarios WHERE email = ?",
            [email]
        );

        if (rows.length === 0)
            return res.status(400).json({ error: "Usuario no encontrado" });

        const user = rows[0];

        // VALIDACIÓN RÁPIDA (no hash)
        if (password !== user.password_hash)
            return res.status(401).json({ error: "Contraseña incorrecta" });

        res.json({
            success: true,
            user_id: user.id_usuario,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en servidor" });
    }
});

module.exports = router;
