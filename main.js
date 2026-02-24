// ... (SHEET_ID y SHEET_GID se mantienen igual)

// Mapeo de columnas según tu Imagen 4:
// I Cuat: 3,4,5,6,7 | Prom: 8
// II Cuat: 9,10,11,12,13 | Prom: 14
// III Cuat: 15,16,17,18,19 | Prom: 20
// IV Cuat (NUEVO ORDEN): Lengua(21), Mate(22), Historia(23), Física(24), Inglés(25) | Prom: 26
// Coloca aquí tu Spreadsheet ID y GID (de la hoja que quieres leer):
const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById('codigo').value.trim();
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = "🔎 Buscando...";

  // Construimos la URL para obtener JSON
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    // Aquí convertimos el texto que devuelve gviz a JSON manipulable
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let estudiante = null;

    // Buscamos la fila con la cédula igual a la que escribe el usuario
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
    
const html = `
  <h2>📋 Notas de: ${estudiante.c[1]?.v}</h2>
  <table class="notas-table">
    <thead>
      <tr>
        <th>Materia</th>
        <th>I Cuatr</th>
        <th>II Cuatr</th>
        <th>III Cuatr</th>
        <th>IV Cuatr</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Lengua y Literatura</td>
        <td>${estudiante.c[3]?.v || "-"}</td>
        <td>${estudiante.c[9]?.v || "-"}</td>
        <td>${estudiante.c[15]?.v || "-"}</td>
        <td>${estudiante.c[21]?.v || "-"}</td>
      </tr>
      <tr>
        <td>Matemática</td>
        <td>${estudiante.c[4]?.v || "-"}</td>
        <td>${estudiante.c[10]?.v || "-"}</td>
        <td>${estudiante.c[16]?.v || "-"}</td>
        <td>${estudiante.c[22]?.v || "-"}</td>
      </tr>
      <tr>
        <td>Geografía / Historia</td>
        <td>${estudiante.c[5]?.v || "-"}</td>
        <td>${estudiante.c[11]?.v || "-"}</td>
        <td>${estudiante.c[17]?.v || "-"}</td>
        <td>${estudiante.c[23]?.v || "-"}</td> 
      </tr>
      <tr>
        <td>Inglés / Química / Física</td>
        <td>${estudiante.c[6]?.v || "-"}</td> <td>${estudiante.c[12]?.v || "-"}</td> <td>${estudiante.c[18]?.v || "-"}</td> <td>${estudiante.c[24]?.v || "-"}</td> </tr>
      <tr>
        <td>Inglés (Específico)</td>
        <td>${estudiante.c[7]?.v || "-"}</td>
        <td>${estudiante.c[13]?.v || "-"}</td>
        <td>${estudiante.c[19]?.v || "-"}</td>
        <td>${estudiante.c[25]?.v || "-"}</td> </tr>
      <tr>
        <td><strong>Promedio</strong></td>
        <td><strong>${estudiante.c[8]?.v || "-"}</strong></td>
        <td><strong>${estudiante.c[14]?.v || "-"}</strong></td>
        <td><strong>${estudiante.c[20]?.v || "-"}</strong></td>
        <td><strong>${estudiante.c[26]?.v || "-"}</strong></td>
      </tr>
    </tbody>
  </table>
`;


