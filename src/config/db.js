const mongoose = require("mongoose"); // Importar mongoose para la conexión a MongoDB

const connectDB = async () => {
  // Función para conectar a la base de datos MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Conectar a MongoDB usando la URI almacenada en las variables de entorno
      useNewUrlParser: true, // Usar el nuevo analizador de URL
      useUnifiedTopology: true,  //Usar el nuevo motor de topología unificada
    });
    console.log(" ✅MongoDB conectado correctamente."); // Mensaje de éxito al conectar
  } catch (error) {
    console.error(" ❌Error al conectar MongoDB:", error.message); // Mensaje de error si la conexión falla
    process.exit(1);
  }
};

module.exports = connectDB;
