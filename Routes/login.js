const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /login/
// Busca un usuario por correo y compara la contraseña recibida.
router.post("/", (req, res) => {
    const { email, password } = req.body;

    // El correo se envía como parámetro para evitar concatenarlo directamente en SQL.
    const query = "SELECT * FROM Usuarios WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error en login:", err);
            return res.status(500).json({ success: false, error: "Error en servidor" });
        }

        // No existe un usuario asociado al correo recibido.
        if (results.length === 0) {
            return res.status(400).json({ success: false, error: "Usuario no encontrado" });
        }

        const user = results[0];

        // Comparación directa con el valor almacenado en la base de datos.
        // En un entorno de producción debería utilizarse almacenamiento seguro con hash.
        if (password !== user.password_hash) {
            return res.status(401).json({ success: false, error: "Contraseña incorrecta" });
        }

        // Devuelve únicamente los datos básicos necesarios para identificar al usuario.
        res.json({
            success: true,
            user_id: user.id_usuario,
            email: user.email
        });
    });
});

module.exports = router;