const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db.js");


const app = express();
app.use(express.json());


// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Conectado a MongoDB.");

    // Solo importa e inicializa el cliente después de conectar a la DB
    const client = require("./services/whatsappClient.js");
    const handleMessage = require("./controllers/messageHandler.js");

    client.on("message", async (message) => {
      try {
        await handleMessage(message, client);
      } catch (error) {
        console.error("❌ Error manejando mensaje:", error.message);
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();