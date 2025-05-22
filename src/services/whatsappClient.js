const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Configuración del cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Generación del código QR para la autenticación
client.on("qr", (qr) => {
  console.log("📱 Escanea este QR para iniciar sesión:");
  qrcode.generate(qr, { small: true });
});

// Manejo de eventos de autenticación
client.on("ready", () => {
  console.log("✅ Cliente de WhatsApp listo.");
});

//Manejo de errores
client.initialize();

module.exports = client;

