// Función para verificar si un mensaje es reciente
function esMensajeReciente(timestamp, limiteSegundos = 30) {
  const ahora = Date.now();
  const timestampMs = (typeof timestamp === 'number' ? timestamp : Number(timestamp)) * 1000;
  const limiteMs = limiteSegundos * 1000;
  return (ahora - (timestamp ? timestampMs : ahora)) < limiteMs;
}

module.exports = esMensajeReciente;