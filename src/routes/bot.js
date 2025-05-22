const express = require("express");
const router = express.Router();
const { askAndRespond } = require ("../services/geminiClient.js"); // ✅ debe incluir extensión .js

// Ruta para manejar preguntas al bot
router.post("/preguntar", async (req, res) => {
  const { mensaje } = req.body;

  // Validar que el mensaje no esté vacío
  if (!mensaje) {
    return res.status(400).json({ error: "Mensaje requerido." });
  }

  try {
    // Llamar a la función askAndRespond para obtener la respuesta
    const respuesta = await askAndRespond(mensaje);
    res.json({ respuesta });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Error al generar respuesta con Gemini." });
  }
});

module.exports = router;
