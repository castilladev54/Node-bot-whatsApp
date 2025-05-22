const mongoose = require("mongoose"); // Importar mongoose para manejar la base de datos

// Definir el esquema de usuario
const UsuarioSchema = new mongoose.Schema(
  {
    numero: {
      type: String,
      required: [true, "El número es obligatorio"], // Mensaje de error personalizado
      unique: true, // Garantiza que no haya duplicados
      trim: true, // Elimina espacios en blanco al inicio y al final
    },
    nombre: {
      type: String,
      trim: true, // Elimina espacios innecesarios
      default: "Usuario Anónimo", // Valor predeterminado si no se proporciona
    },
    historial: {
      type: [String], // Array de cadenas para almacenar el historial de mensajes
      default: [], // Inicializa como un array vacío
    },
  },
  {
    timestamps: true, // Agrega automáticamente campos `createdAt` y `updatedAt`
    versionKey: false, // Elimina el campo `__v` de los documentos
  }
);

// Exportar el modelo de usuario
module.exports = mongoose.model("Usuario", UsuarioSchema);

//listo para produccion EEEE YUPIIII