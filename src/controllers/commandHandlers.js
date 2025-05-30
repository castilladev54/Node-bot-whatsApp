const loadAllPrompts = require("../utils/loadPrompts.js");
const fs = loadAllPrompts(["prompts"], [
  "barraMenu.txt",
  "formulario.txt"
]);

// Función reutilizable para respuestas repetidas
const responderLlamada = async (message) => {
  return await message.reply(
    "📞 Llamando... Un asesor se pondrá en contacto contigo pronto."
  );
};

// Exportar el objeto con los comandos
module.exports = {
  ayuda: async (message) => await message.reply(fs.barraMenu),
  "1": async (message) =>
    await message.reply(
      "👋 ¡Hola! Bienvenido a Asistavet Venezuela 🐾\nEstamos aquí para ayudarte con lo que tu mascota necesite.\n\n✅ ¿Deseas agendar cita ?\nResponde con el número: 2️⃣"
    ),
  bienvenidos: async (message) =>
    await message.reply(
      "👋 ¡Hola! Bienvenido a Asistavet Venezuela 🐾\nEstamos aquí para ayudarte con lo que tu mascota necesite.\n\n✅ ¿Deseas agendar cita ?\nResponde con el número: 2️⃣"
    ),
  "2": async (message) => await message.reply(fs.formulario),
  "3": responderLlamada,
  llamada: responderLlamada,
  "atención al cliente": responderLlamada,
};

