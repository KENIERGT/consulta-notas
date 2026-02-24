const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");
  
  if (!codigo) {
    resultado.innerHTML = "<p style='color: red;'>⚠️ Por favor, ingresa un código.</p>";
    return;
  }

  resultado.innerHTML = "🔎 Buscando...";

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let estudiante = null;

    // Buscar en Columna C (índice 2)
    for (let row of rows) {
      const codFila = row.c[2]?.v;
      if (codFila && codFila.toString().trim().toUpperCase() === codigo.toUpperCase()) {
        estudiante = row;
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "❌ Código no encontrado.";
      return;
    }

    // FUNCIÓN DE COLOR: Aplica rojo si es <= 59.4
    const f = (valor) => {
      if (valor === null || valor === undefined || valor === "" || valor === 0) return "-";
      
      // Limpiar el valor por si viene con comas
      const num = parseFloat(valor.toString().replace(',', '.'));
      
      if (!isNaN(num) && num <= 59.4) {
        // El !important es clave para ganarle al style.css
        return `<span style="color: #ff0000 !important; font-weight: bold !important;">${valor}</span>`;
      }
      return valor;
    };

    // Construcción del HTML
    let html = `
      <div style="text-align: left; margin-top: 30px; font-family: sans-serif;">
        <h2 style="font-size: 2.5rem; color: #1a73e8; margin-bottom: 10px; border-bottom: 2px solid #1a73e8; display: inline-block;">
          📋 Notas de: ${estudiante.c[1]?.v}
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 12px;">Materia</th>
              <th style="border: 1px solid #ddd; padding: 12px;">I Cuat.</th>
              <th style="border: 1px solid #ddd; padding: 12px;">II Cuat.</th>
              <th style="border: 1px solid #ddd; padding: 12px;">III Cuat.</th>
              <th style="border: 1px solid #ddd; padding: 12px;">IV Cuat.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Lengua y Literatura</strong></td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[3]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[9]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[15]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[21]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Matemática</strong></td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[4]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[10]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[16]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[22]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Geografía / Historia</strong></td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[5]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[11]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[17]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[23]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Ciencias / Química / Física</strong></td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[6]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[12]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[18]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[24]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Inglés</strong></td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[7]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[13]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[19]?.v)}</td>
              <td style="border: 1px solid #ddd; text-align: center;">${f(estudiante.c[25]?.v)}</td>
            </tr>
            
            <tr><td colspan="5" style="height: 30px; border: none;"></td></tr>
            
            <tr style="background-color: #e8f0fe; font-size: 1.2rem;">
              <td style="border: 2px solid #1a73e8; padding: 15px;"><strong>PROMEDIO CUATRIMESTRAL</strong></td>
              <td style="border: 2px solid #1a73e8; text-align: center;"><strong>${f(estudiante.c[8]?.v)}</strong></td>
              <td style="border: 2px solid #1a73e8; text-align: center;"><strong>${f(estudiante.c[14]?.v)}</strong></td>
              <td style="border: 2px solid #1a73e8; text-align: center;"><strong>${f(estudiante.c[20]?.v)}</strong></td>
              <td style="border: 2px solid #1a73e8; text-align: center; color: #1a73e8; font-size: 1.5rem;">
                <strong>${f(estudiante.c[26]?.v)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    resultado.innerHTML = html;

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "⚠️ Error al cargar los datos.";
  }
}
