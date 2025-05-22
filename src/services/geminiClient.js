const dotenv = require("dotenv");
dotenv.config();
const loadAllPrompts = require("../utils/loadPrompts.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const prompts = loadAllPrompts(["prompts"], ["prompt.txt"]);

if (!process.env.GEMINI_API_KEY) {
  throw new Error("La variable de entorno GEMINI_API_KEY no está configurada.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let model = null;
let chat = null;

function getModel() {
  if (!model) {
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  return model;
}

function getChat() {
  if (!chat) {
    chat = getModel().startChat({
      history: [
        {
          role: "user",
          parts: [{ text: prompts.prompt || "" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 150,
      },
    });
  }
  return chat;
}

async function askAndRespond(message) {
  if (!message || typeof message !== "string") {
    throw new Error("El mensaje proporcionado no es válido. Debe ser un string no vacío.");
  }

  try {
    const chatInstance = getChat();
    const result = await chatInstance.sendMessageStream(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Si el chat falla, intenta reiniciarlo una vez
    console.error("Error en Gemini al procesar el mensaje:", error.message);
    chat = null;
    try {
      const chatInstance = getChat();
      const result = await chatInstance.sendMessageStream(message);
      const response = await result.response;
      return response.text();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = { askAndRespond };

