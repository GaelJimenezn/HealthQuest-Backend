// routes/sessions.js (o tu archivo controlador)

router.post('/', (req, res) => {
    // 1. Recibimos los datos tal cual los envía Unity (clase SimpleSessionData)
    const {
        paciente_id,
        duracion,   // En C# es 'duracion'
        enemigos,   // En C# es 'enemigos'
        cadencia,
        velocidad
    } = req.body;

    // 2. Preparamos la consulta SQL
    // NOTA: Mapeamos 'enemigos' (del JSON) a 'total_enemigos' (de la Tabla)
    // NOTA: Usamos 'duracion' que es el nombre correcto en tu tabla
    const query = `
        INSERT INTO sessions 
        (paciente_id, duracion, total_enemigos, cadencia, velocidad, fecha) 
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    // 3. Ejecutamos la consulta
    db.query(query, [paciente_id, duracion, enemigos, cadencia, velocidad], (err, result) => {
        if (err) {
            console.error("Error al insertar sesión:", err);
            // Devolvemos error 500 con detalle para debug
            return res.status(500).json({ error: err.message });
        }

        // 4. Devolvemos el ID generado para que Unity lo use luego en el PUT
        res.status(200).json({
            success: true,
            id: result.insertId,
            message: "Sesión configurada correctamente"
        });
    });
});