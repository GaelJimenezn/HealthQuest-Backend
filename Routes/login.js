const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM Usuarios WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error en login:", err);
            return res.status(500).json({ success: false, error: "Error en servidor" });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, error: "Usuario no encontrado" });
        }

        const user = results[0];

        if (password !== user.password_hash) {
            return res.status(401).json({ success: false, error: "Contraseña incorrecta" });
        }

        res.json({
            success: true,
            user_id: user.id_usuario,
            email: user.email
        });
    });
});

module.exports = router;