const { askAndRespond } = require("../services/geminiClient.js");
const { esMensajeRelevante, esSaludo } = require("../utils/validaciones.js");
const esMensajeReciente = require("../utils/mensajesReciente.js");
const Usuario = require("../models/user.js");
const prompts = require("../utils/loadPrompts.js");
const commandHandlers = require("./commandHandlers.js");

async function handleMessage(message) {
  try {
    const userNumber = message.from;
    const messageText = (message.body || "").toString().trim();
    const textoNormalizado = messageText.toLowerCase();
    const messageTimestamp = message.timestamp;

    // Verifica si el mensaje es reciente
    if (!esMensajeReciente(messageTimestamp)) {
      console.warn("⚠️ Mensaje antiguo recibido. No será procesado.");
      return;
    }
    
    // Verifica si el mensaje es relevante
    if (!esMensajeRelevante(messageText)) {
      console.warn("⚠️ Mensaje vacío o irrelevante recibido.");
      return;
    }

    // Saludo: responde y termina
    if (esSaludo(messageText)) {
      return await message.reply(
        "👋 ¡Hola! Soy el asistente de *Castilla Dev*.\nEscribe la palabra *'ayuda'* para ver el menú."
      );
    }

    // Comando: ejecuta y termina
    if (commandHandlers[textoNormalizado]) {
      return await commandHandlers[textoNormalizado](message, prompts);
    }

    // Solo aquí guarda el historial (evita guardar saludos y comandos)
    await Usuario.findOneAndUpdate(
      { numero: userNumber },
      {
        $push: { historial: messageText },
        $setOnInsert: { nombre: userNumber },
      },
      { upsert: true, new: true }
    );

    // Llama a la IA solo si no fue saludo ni comando
    const aiResponse = await askAndRespond(messageText);
    return await message.reply(aiResponse);

  } catch (error) {
    console.error("❌ Error en handleMessage:", error);
    await message.reply(
      "❌ Ocurrió un error procesando tu mensaje. Intenta de nuevo más tarde."
    );
  }
}

module.exports = handleMessage;