const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");
  
  if (!codigo) {
    resultado.innerHTML = "⚠️ Por favor, ingresa un número de cédula.";
    return;
  }

  resultado.innerHTML = "🔎 Buscando...";

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    // Limpiamos la respuesta JSON de Google
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let estudiante = null;

    // Buscamos al estudiante por cédula (Columna C -> índice 2)
    for (let row of rows) {
      const codFila = row.c[2]?.v;
      if (codFila && codFila.toString().trim().toUpperCase() === codigo.toUpperCase()) {
        estudiante = row;
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "❌ Código no encontrado. Revisa los datos e intenta de nuevo.";
      return;
    }

    // Función para manejar valores vacíos o ceros
    const format = (val) => (val === null || val === undefined || val === 0) ? "-" : val;

    // Construcción de la tabla con los índices de tu última imagen (image_53fd6e.png)
    let html = `
      <div class="card-notas">
        <h3>📋 Notas de: ${estudiante.c[1]?.v}</h3>
        <table class="notas-table">
          <thead>
            <tr>
              <th>Materia</th>
              <th>I Cuat.</th>
              <th>II Cuat.</th>
              <th>III Cuat.</th>
              <th>IV Cuat.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Lengua y Literatura</strong></td>
              <td>${format(estudiante.c[3]?.v)}</td>
              <td>${format(estudiante.c[9]?.v)}</td>
              <td>${format(estudiante.c[15]?.v)}</td>
              <td>${format(estudiante.c[21]?.v)}</td>
            </tr>
            <tr>
              <td><strong>Matemática</strong></td>
              <td>${format(estudiante.c[4]?.v)}</td>
              <td>${format(estudiante.c[10]?.v)}</td>
              <td>${format(estudiante.c[16]?.v)}</td>
              <td>${format(estudiante.c[22]?.v)}</td>
            </tr>
            <tr>
              <td><strong>Geografía / Historia</strong></td>
              <td>${format(estudiante.c[5]?.v)}</td>
              <td>${format(estudiante.c[11]?.v)}</td>
              <td>${format(estudiante.c[17]?.v)}</td>
              <td>${format(estudiante.c[23]?.v)}</td>
            </tr>
            <tr>
              <td><strong>Ciencias / Química / Física</strong></td>
              <td>${format(estudiante.c[6]?.v)}</td>
              <td>${format(estudiante.c[12]?.v)}</td>
              <td>${format(estudiante.c[18]?.v)}</td>
              <td>${format(estudiante.c[24]?.v)}</td>
            </tr>
            <tr>
              <td><strong>Inglés</strong></td>
              <td>${format(estudiante.c[7]?.v)}</td>
              <td>${format(estudiante.c[13]?.v)}</td>
              <td>${format(estudiante.c[19]?.v)}</td>
              <td>${format(estudiante.c[25]?.v)}</td>
            </tr>
            <tr class="fila-promedio">
              <td><strong>PROMEDIO</strong></td>
              <td>${format(estudiante.c[8]?.v)}</td>
              <td>${format(estudiante.c[14]?.v)}</td>
              <td>${format(estudiante.c[20]?.v)}</td>
              <td><strong>${format(estudiante.c[26]?.v)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    resultado.innerHTML = html;

  } catch (error) {
    console.error("Error al buscar:", error);
    resultado.innerHTML = "⚠️ Hubo un problema al conectar con la base de datos.";
  }
}


