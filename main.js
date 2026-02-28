const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!codigo) {
    resultado.innerHTML = "<p style='color:red;font-weight:bold;'>⚠️ Ingresa un código.</p>";
    return;
  }

  resultado.innerHTML = "🔎 Buscando en el registro...";

  // 🔥 USAMOS EXPORT CSV (NO FALLA EN GITHUB)
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    const filas = text.split("\n").map(f => f.split(","));

    let estudiante = null;

    // Buscar por cédula (columna C = índice 2)
    for (let i = 1; i < filas.length; i++) {
      if (filas[i][2] && filas[i][2].trim().toUpperCase() === codigo.toUpperCase()) {
        estudiante = filas[i];
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "❌ Código no encontrado.";
      return;
    }

    const safe = (i) => estudiante[i] ? estudiante[i] : "-";

    const f = (valor) => {
      if (!valor || valor === "-") return "-";
      const num = parseFloat(valor.replace(",", "."));
      if (!isNaN(num) && num <= 59.4) {
        return `<strong style="color:red;">${valor}</strong>`;
      }
      return valor;
    };

    let html = `
      <div style="margin-top:30px;font-family:sans-serif;text-align:left;">
        
        <h2 style="font-size:2.5rem;color:#1a73e2;border-bottom:5px solid #1a73e8;display:inline-block;">
          📋 ${safe(1)}
        </h2>

        <div style="margin-top:10px;">
          <strong>🆔 Cédula:</strong> ${safe(2)}
        </div>

        <div style="margin-top:5px;">
          <strong>🏫 Sección:</strong> ${safe(39)}
        </div>

        <table style="width:100%;border-collapse:collapse;margin-top:20px;background:white;">
          <tbody>
            <tr>
              <td><strong>Lengua y Literatura</strong></td>
              <td>${f(safe(3))}</td>
              <td>${f(safe(9))}</td>
              <td>${f(safe(15))}</td>
              <td>${f(safe(21))}</td>
              <td>${f(safe(27))}</td>
              <td>${f(safe(33))}</td>
            </tr>

            <tr>
              <td><strong>Matemática</strong></td>
              <td>${f(safe(4))}</td>
              <td>${f(safe(10))}</td>
              <td>${f(safe(16))}</td>
              <td>${f(safe(22))}</td>
              <td>${f(safe(28))}</td>
              <td>${f(safe(34))}</td>
            </tr>

            <tr>
              <td><strong>Geografía / Historia</strong></td>
              <td>${f(safe(5))}</td>
              <td>${f(safe(11))}</td>
              <td>${f(safe(17))}</td>
              <td>${f(safe(23))}</td>
              <td>${f(safe(29))}</td>
              <td>${f(safe(35))}</td>
            </tr>

            <tr>
              <td><strong>Ciencias / Química / Física</strong></td>
              <td>${f(safe(6))}</td>
              <td>${f(safe(12))}</td>
              <td>${f(safe(18))}</td>
              <td>${f(safe(24))}</td>
              <td>${f(safe(30))}</td>
              <td>${f(safe(36))}</td>
            </tr>

            <tr>
              <td><strong>Inglés</strong></td>
              <td>${f(safe(7))}</td>
              <td>${f(safe(13))}</td>
              <td>${f(safe(19))}</td>
              <td>${f(safe(25))}</td>
              <td>${f(safe(31))}</td>
              <td>${f(safe(37))}</td>
            </tr>

            <tr style="font-weight:bold;background:#e8f0fe;">
              <td>PROMEDIO GENERAL</td>
              <td>${f(safe(8))}</td>
              <td>${f(safe(14))}</td>
              <td>${f(safe(20))}</td>
              <td>${f(safe(26))}</td>
              <td>${f(safe(32))}</td>
              <td>${f(safe(38))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    resultado.innerHTML = html;

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "⚠️ Error crítico al conectar con la base de datos.";
  }
}
