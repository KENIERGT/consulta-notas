const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");
  
  if (!codigo) {
    resultado.innerHTML = "<p style='color: red; font-weight: bold;'>⚠️ Por favor, ingresa un código.</p>";
    return;
  }

  resultado.innerHTML = "<p>🔎 Buscando en el registro...</p>";

  // URL para obtener los datos de la hoja "NOTAS I,II,III"
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    // Limpieza del formato JSON de Google Sheets
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let estudiante = null;

    // Busqueda por cédula en la columna C (índice 2)
    for (let row of rows) {
      const codFila = row.c[2]?.v;
      if (codFila && codFila.toString().trim().toUpperCase() === codigo.toUpperCase()) {
        estudiante = row;
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "<p style='color: #e74c3c; font-weight: bold;'>❌ Código no encontrado. Verifique e intente de nuevo.</p>";
      return;
    }

    /**
     * Función para formatear notas:
     * 1. Si es vacío o 0, pone un guion.
     * 2. Si es <= 59.4, aplica color rojo con !important para asegurar el estilo.
     */
    const f = (valor) => {
      if (valor === null || valor === undefined || valor === "" || valor === 0) return "-";
      
      // Asegurar que el valor se trate como número para la comparación
      const num = parseFloat(valor.toString().replace(',', '.'));
      
      if (!isNaN(num) && num <= 59.4) {
        return `<span style="color: #ff0000 !important; font-weight: bold !important;">${valor}</span>`;
      }
      return valor;
    };

    // Construcción del contenido HTML
    let html = `
      <div class="container-resultado" style="margin-top: 30px; text-align: left;">
        <h2 style="font-size: 2.5rem; color: #1a73e8; margin-bottom: 20px; border-bottom: 3px solid #1a73e8; display: inline-block;">
          📋 Notas de: ${estudiante.c[1]?.v}
        </h2>
        
        <table class="notas-table" style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #f1f3f4; text-align: center;">
              <th style="border: 1px solid #ccc; padding: 12px;">Materia</th>
              <th style="border: 1px solid #ccc; padding: 12px;">I Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px;">II Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px;">III Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px;">IV Cuat.</th>
            </tr>
          </thead>
          <tbody style="text-align: center;">
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px; text-align: left;"><strong>Lengua y Literatura</strong></td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[3]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[9]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[15]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[21]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px; text-align: left;"><strong>Matemática</strong></td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[4]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[10]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[16]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[22]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px; text-align: left;"><strong>Geografía / Historia</strong></td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[5]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[11]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[17]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[23]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px; text-align: left;"><strong>Ciencias / Química / Física</strong></td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[6]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[12]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[18]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[24]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px; text-align: left;"><strong>Inglés</strong></td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[7]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[13]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[19]?.v)}</td>
              <td style="border: 1px solid #ccc;">${f(estudiante.c[25]?.v)}</td>
            </tr>
            
            <tr><td colspan="5" style="height: 20px; border: none;"></td></tr>
            
            <tr style="background-color: #e8f0fe; font-weight: bold; border: 2px solid #1a73e8;">
              <td style="padding: 15px; text-align: left; border: 1px solid #1a73e8;">Promedio General</td>
              <td style="border: 1px solid #1a73e8;">${f(estudiante.c[8]?.v)}</td>
              <td style="border: 1px solid #1a73e8;">${f(estudiante.c[14]?.v)}</td>
              <td style="border: 1px solid #1a73e8;">${f(estudiante.c[20]?.v)}</td>
              <td style="border: 1px solid #1a73e8; font-size: 1.4rem; color: #1a73e8;">${f(estudiante.c[26]?.v)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    resultado.innerHTML = html;

  } catch (error) {
    console.error("Error al obtener datos:", error);
    resultado.innerHTML = "<p style='color: red;'>⚠️ Ocurrió un error al cargar las notas. Intente más tarde.</p>";
  }
}
