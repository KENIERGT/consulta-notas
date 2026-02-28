const SHEET_ID = "15EJszt2CU2bN5xVPyGnkfT0DVFraDJuMImtuIraJyZk";
const SHEET_GID = "1138138025";

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");
  
  if (!codigo) {
    resultado.innerHTML = "<p style='color: red; font-weight: bold;'>⚠️ Por favor, ingresa un código.</p>";
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

    // Buscar en Columna C (índice 2)
    for (let row of rows) {
      const codFila = row.c[2]?.v;
      if (codFila && codFila.toString().trim().toUpperCase() === codigo.toUpperCase()) {
        estudiante = row;
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "❌ Código no encontrado. Revisa los datos.";
      return;
    }

    // FUNCIÓN DE FORMATO Y COLOR ROJO (<= 59.4)
    const f = (valor) => {
      if (valor === null || valor === undefined || valor === "" || valor === 0 || valor === "-") {
        return "-";
      }
      
      // Convertimos a número manejando comas decimales
      const num = parseFloat(valor.toString().replace(',', '.'));
      
      // Si la nota es menor o igual a 59.4, forzamos el color rojo
      if (!isNaN(num) && num <= 59.4) {
        return `<strong style="color: #ff0000 !important; display: inline-block;">${valor}</strong>`;
      }
      return valor;
    };

    // CONSTRUCCIÓN DEL HTML COMPLETO
    let html = `
      <div style="margin-top: 30px; font-family: sans-serif; text-align: left;">
        
      <h2 style="font-size: 2.8rem; color: #1a73e2; margin-bottom: 5px; border-bottom: 6px solid #1a73e8; display: inline-block; font-weight: 800;">
        📋 ${safe(estudiante, 1)}
      </h2>
      
      <div style="margin-top:10px; font-size:1.1rem;">
        <strong>🆔 Cédula:</strong> ${safe(estudiante, 2)}
      </div>
      
      <div style="margin-top:5px; font-size:1.1rem;">
        <strong>🏫 Sección:</strong> ${safe(estudiante, 39)}
      </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ccc; padding: 12px; text-align: left;">Materia</th>
              <th style="border: 1px solid #ccc; padding: 12px; text-align: center;">I Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px; text-align: center;">II Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px; text-align: center;">III Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px; text-align: center;">IV Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px; text-align: center;">V Cuat.</th>
              <th style="border: 1px solid #ccc; padding: 12px; text-align: center;">VI Cuat.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px;"><strong>Lengua y Literatura</strong></td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[3]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[9]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[15]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[21]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[27]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[33]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px;"><strong>Matemática</strong></td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[4]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[10]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[16]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[22]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[28]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[34]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px;"><strong>Geografía / Historia</strong></td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[5]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[11]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[17]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[23]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[29]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[35]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px;"><strong>Ciencias / Química / Física</strong></td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[6]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[12]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[18]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[24]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[30]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[36]?.v)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 10px;"><strong>Inglés</strong></td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[7]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[13]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[19]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[25]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[31]?.v)}</td>
              <td style="border: 1px solid #ccc; text-align: center;">${f(estudiante.c[37]?.v)}</td>
            </tr>
            
            <tr><td colspan="5" style="height: 25px; border: none;"></td></tr>
            
            <tr style="background-color: #e8f0fe; font-weight: bold; border: 2px solid #1a73e8;">
              <td style="border: 1px solid #1a73e8; padding: 15px;">PROMEDIO GENERAL</td>
              <td style="border: 1px solid #1a73e8; text-align: center;">${f(estudiante.c[8]?.v)}</td>
              <td style="border: 1px solid #1a73e8; text-align: center;">${f(estudiante.c[14]?.v)}</td>
              <td style="border: 1px solid #1a73e8; text-align: center;">${f(estudiante.c[20]?.v)}</td>
              <td style="border: 1px solid #1a73e8; text-align: center;">${f(estudiante.c[26]?.v)}</td>
              <td style="border: 1px solid #1a73e8; text-align: center;">${f(estudiante.c[32]?.v)}</td>
              <td style="border: 1px solid #1a73e8; text-align: center;">${f(estudiante.c[38]?.v)}</td>
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









