const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "🔎 Buscando...";

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let estudiante = null;

    // Buscar fila donde coincida la cédula (Columna C = índice 2)
    for (let row of rows) {
      const codFila = row.c[2]?.v;
      if (codFila && codFila.toString().trim() === codigo) {
        estudiante = row;
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "❌ Código no encontrado. Intenta de nuevo.";
      return;
    }

    // Función interna para formatear las notas (si es 0 o null poner guion)
    const f = (valor) => {
        return (valor === null || valor === undefined || valor === 0) ? "-" : valor;
    };

    // Generar la tabla con el mapeo exacto de tu Imagen 4
    let html = `
      <h2>📋 Notas de: ${estudiante.c[1]?.v}</h2>
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
            <td>Lengua y Literatura</td>
            <td>${f(estudiante.c[3]?.v)}</td>
            <td>${f(estudiante.c[9]?.v)}</td>
            <td>${f(estudiante.c[15]?.v)}</td>
            <td>${f(estudiante.c[21]?.v)}</td>
          </tr>
          <tr>
            <td>Matemática</td>
            <td>${f(estudiante.c[4]?.v)}</td>
            <td>${f(estudiante.c[10]?.v)}</td>
            <td>${f(estudiante.c[16]?.v)}</td>
            <td>${f(estudiante.c[22]?.v)}</td>
          </tr>
          <tr>
            <td>Geografía / Historia</td>
            <td>${f(estudiante.c[5]?.v)}</td>
            <td>${f(estudiante.c[11]?.v)}</td>
            <td>${f(estudiante.c[17]?.v)}</td>
            <td>${f(estudiante.c[23]?.v)}</td> 
          </tr>
          <tr>
            <td>Ciencias / Química / Física</td>
            <td>${f(estudiante.c[6]?.v)}</td>
            <td>${f(estudiante.c[12]?.v)}</td>
            <td>${f(estudiante.c[18]?.v)}</td>
            <td>${f(estudiante.c[24]?.v)}</td> 
          </tr>
          <tr>
            <td>Inglés</td>
            <td>${f(estudiante.c[7]?.v)}</td>
            <td>${f(estudiante.c[13]?.v)}</td>
            <td>${f(estudiante.c[19]?.v)}</td>
            <td>${f(estudiante.c[25]?.v)}</td>
          </tr>
          <tr style="background-color: #f2f2f2; font-weight: bold;">
            <td>Promedio</td>
            <td>${f(estudiante.c[8]?.v)}</td>
            <td>${f(estudiante.c[14]?.v)}</td>
            <td>${f(estudiante.c[20]?.v)}</td>
            <td>${f(estudiante.c[26]?.v)}</td>
          </tr>
        </tbody>
      </table>
    `;

    resultado.innerHTML = html;

  } catch (error) {
    resultado.innerHTML = "⚠️ Ocurrió un error al cargar los datos.";
    console.error(error);
  }
}


