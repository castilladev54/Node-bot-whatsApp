// Este módulo contiene funciones de validación para mensajes de texto
function esMensajeRelevante(text) {
  return text && text.trim().length > 0;
}

function esSaludo(text) {
  if (!esMensajeRelevante(text)) return false;
  const saludoRegex = /^(hola+|ola+|buen[oa]s?\\s?(d[ií]as|tardes|noches)|👋)$/i;
  return saludoRegex.test(text.trim());
}

module.exports = {esMensajeRelevante, esSaludo};