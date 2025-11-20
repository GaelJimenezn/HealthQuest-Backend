const express = require("express");
const router = express.Router();
const db = require("../db");

// LOGIN sin hash (solo pruebas)
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query(
            "SELECT * FROM Usuarios WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ success: false, error: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Comparación SIMPLE (solo pruebas)
        if (password !== user.password_hash) {
            return res.status(401).json({ success: false, error: "Contraseña incorrecta" });
        }

        // Login exitoso
        res.json({
            success: true,
            user_id: user.id_usuario,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Error en servidor" });
    }
});

module.exports = router;
