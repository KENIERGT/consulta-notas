const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!codigo) {
    resultado.innerHTML = "<p style='color:red;font-weight:bold;'>⚠️ Por favor, ingresa un código.</p>";
    return;
  }

  resultado.innerHTML = "🔎 Buscando en el registro...";

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&tq=select *&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("No se pudo acceder a la hoja");
    }

    const text = await res.text();

    const json = JSON.parse(
      text.substring(
        text.indexOf("{"),
        text.lastIndexOf("}") + 1
      )
    );

    if (!json.table || !json.table.rows) {
      throw new Error("Formato inesperado de Google Sheets");
    }

    const rows = json.table.rows;

    let estudiante = null;

    // Buscar por CÉDULA (columna C → índice 2)
    for (let row of rows) {
      if (!row.c) continue;

      const codFila = row.c[2]?.v;

      if (
        codFila &&
        codFila.toString().trim().toUpperCase() === codigo.toUpperCase()
      ) {
        estudiante = row;
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "❌ Código no encontrado. Revisa los datos.";
      return;
    }

    // Función segura para obtener columnas
    const safe = (fila, i) => fila?.c?.[i]?.v ?? "-";

    // Función de formato y color rojo (<= 59.4)
    const f = (valor) => {
      if (
        valor === null ||
        valor === undefined ||
        valor === "" ||
        valor === 0 ||
        valor === "-"
      ) {
        return "-";
      }

      const num = parseFloat(valor.toString().replace(",", "."));

      if (!isNaN(num) && num <= 59.4) {
        return `<strong style="color:#ff0000;">${valor}</strong>`;
      }

      return valor;
    };

    let html = `
      <div style="margin-top:30px;font-family:sans-serif;text-align:left;">
        
        <h2 style="font-size:2.5rem;color:#1a73e2;margin-bottom:5px;border-bottom:5px solid #1a73e8;display:inline-block;font-weight:800;">
          📋 ${safe(estudiante, 1)}
        </h2>

        <div style="margin-top:10px;font-size:1.1rem;">
          <strong>🆔 Cédula:</strong> ${safe(estudiante, 2)}
        </div>

        <div style="margin-top:5px;font-size:1.1rem;">
          <strong>🏫 Sección:</strong> ${safe(estudiante, 39)}
        </div>

        <table style="width:100%;border-collapse:collapse;margin-top:20px;background:white;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color:#f8f9fa;">
              <th style="border:1px solid #ccc;padding:12px;text-align:left;">Materia</th>
              <th style="border:1px solid #ccc;padding:12px;text-align:center;">I Cuat.</th>
              <th style="border:1px solid #ccc;padding:12px;text-align:center;">II Cuat.</th>
              <th style="border:1px solid #ccc;padding:12px;text-align:center;">III Cuat.</th>
              <th style="border:1px solid #ccc;padding:12px;text-align:center;">IV Cuat.</th>
              <th style="border:1px solid #ccc;padding:12px;text-align:center;">V Cuat.</th>
              <th style="border:1px solid #ccc;padding:12px;text-align:center;">VI Cuat.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid #ccc;padding:10px;"><strong>Lengua y Literatura</strong></td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,3))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,9))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,15))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,21))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,27))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,33))}</td>
            </tr>

            <tr>
              <td style="border:1px solid #ccc;padding:10px;"><strong>Matemática</strong></td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,4))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,10))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,16))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,22))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,28))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,34))}</td>
            </tr>

            <tr>
              <td style="border:1px solid #ccc;padding:10px;"><strong>Geografía / Historia</strong></td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,5))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,11))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,17))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,23))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,29))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,35))}</td>
            </tr>

            <tr>
              <td style="border:1px solid #ccc;padding:10px;"><strong>Ciencias / Química / Física</strong></td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,6))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,12))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,18))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,24))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,30))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,36))}</td>
            </tr>

            <tr>
              <td style="border:1px solid #ccc;padding:10px;"><strong>Inglés</strong></td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,7))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,13))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,19))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,25))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,31))}</td>
              <td style="border:1px solid #ccc;text-align:center;">${f(safe(estudiante,37))}</td>
            </tr>

            <tr style="background-color:#e8f0fe;font-weight:bold;border:2px solid #1a73e8;">
              <td style="border:1px solid #1a73e8;padding:15px;">PROMEDIO GENERAL</td>
              <td style="border:1px solid #1a73e8;text-align:center;">${f(safe(estudiante,8))}</td>
              <td style="border:1px solid #1a73e8;text-align:center;">${f(safe(estudiante,14))}</td>
              <td style="border:1px solid #1a73e8;text-align:center;">${f(safe(estudiante,20))}</td>
              <td style="border:1px solid #1a73e8;text-align:center;">${f(safe(estudiante,26))}</td>
              <td style="border:1px solid #1a73e8;text-align:center;">${f(safe(estudiante,32))}</td>
              <td style="border:1px solid #1a73e8;text-align:center;">${f(safe(estudiante,38))}</td>
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
