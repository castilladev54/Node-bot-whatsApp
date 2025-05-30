require("dotenv").config();
const connectDB = require("./config/db.js");

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

  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();