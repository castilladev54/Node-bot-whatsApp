const fs = require("fs");
const path = require("path");

/**
 * Carga todos los archivos .txt desde una subcarpeta específica y los exporta como un objeto.
 * @param {string[]} subPathArray - Ruta relativa como array. Ej: ["services", "prompt"]
 * @returns {Object} - Objeto donde la clave es el nombre del archivo (sin .txt) y el valor es su contenido.
 */
function loadAllPrompts(subPathArray) {
  const folderPath = path.join(__dirname, "..", ...subPathArray);

  if (!fs.existsSync(folderPath)) { // Verifica si la carpeta existe
    throw new Error(`La carpeta no existe: ${folderPath}`);
  }

  const txtFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".txt"));

  const prompts = {};
  txtFiles.forEach(file => {
    const key = path.basename(file, ".txt"); // nombre sin extensión
    const content = fs.readFileSync(path.join(folderPath, file), "utf-8");
    prompts[key] = content;
  });

  return prompts;
}

module.exports = loadAllPrompts;

