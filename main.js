const SHEET_ID = "1j9FQ5sCX2X2hJC99pBPU44bPGbSwvf2XFulxwvJXFxs";
// Usamos el GID de la hoja específica (1138138025)
const SHEET_GID = "1138138025"; 

async function buscarNotas() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!codigo) {
    resultado.innerHTML = "<p style='color:red;font-weight:bold;'>⚠️ Ingresa un código.</p>";
    return;
  }

  resultado.innerHTML = `
    <div class="spinner-container">
      <div class="spinner"></div>
      <p style="color:black;margin-top:15px;">Consultando notas...</p>
    </div>
  `;

  // URL de exportación CSV
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    
    // Dividir por líneas y luego por comas
    const filas = text.split("\n").map(f => f.split(","));

    let estudiante = null;

    // Buscamos el código en la columna C (Índice 2)
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

    const safe = (i) => (estudiante[i] && estudiante[i].trim() !== "") ? estudiante[i].trim() : "-";

    const f = (valor) => {
      if (!valor || valor === "-") return "-";
      const num = parseFloat(valor.replace(",", "."));
      if (!isNaN(num) && num < 60) {
        return `<strong style="color:red;">${valor}</strong>`;
      }
      return valor;
    };

    const crearFila = (nombre, a, b, c, d, e, fIndex) => {
      return `
      <tr>
        <td style="padding:10px;border:1px solid #ccc;"><strong>${nombre}</strong></td>
        <td style="text-align:center;border:1px solid #ccc;">${f(safe(a))}</td>
        <td style="text-align:center;border:1px solid #ccc;">${f(safe(b))}</td>
        <td style="text-align:center;border:1px solid #ccc;">${f(safe(c))}</td>
        <td style="text-align:center;border:1px solid #ccc;">${f(safe(d))}</td>
        <td style="text-align:center;border:1px solid #ccc;">${f(safe(e))}</td>
        <td style="text-align:center;border:1px solid #ccc;">${f(safe(fIndex))}</td>
      </tr>`;
    };

    let html = `
    <div class="fade-slide" style="margin-top:30px;">
        <h2 style="color:#1a73e8;">📋 ${safe(0)}</h2>
        <div><strong>🆔 Cédula:</strong> ${safe(1)}</div>
        <div><strong>🏫 Sección:</strong> ${safe(51)}</div>
        <div><strong>🏫 Centro Educativo:</strong> Instituto Nacional Público Rosa Montoya Flores</div>

        <button onclick="exportarPDF('${safe(0)}','${safe(1)}','${safe(51)}')" 
        style="margin:15px 0;background:#1a73e8;color:white;
        border:none;padding:10px 20px;border-radius:6px;
        cursor:pointer;font-weight:bold;">
        📄 Exportar PDF
        </button>

        <div class="responsive-table-container">
          <table id="tabla-notas" style="width:100%;border-collapse:collapse;margin-top:15px;">
            <thead>
              <tr style="background:#1a73e8;color:white;">
                <th style="width:30%;padding:12px;border:1px solid #ccc;text-align:left;">Materia</th>
                <th style="text-align:center;border:1px solid #ccc;">I Cuatri</th>
                <th style="text-align:center;border:1px solid #ccc;">II Cuatr</th>
                <th style="text-align:center;border:1px solid #ccc;">III Cuatr</th>
                <th style="text-align:center;border:1px solid #ccc;">IV Cuatr</th>
                <th style="text-align:center;border:1px solid #ccc;">V Cuatr</th>
                <th style="text-align:center;border:1px solid #ccc;">VI Cuatr</th>
              </tr>
            </thead>
            <tbody>
              ${crearFila("Lengua y Literatura", 3, 11, 19, 27, 35, 43)}
              ${crearFila("Matemática", 4, 12, 20, 28, 36, 44)}
              ${crearFila("Geografía", 5, 21, 37, "-", "-", "-")}
              ${crearFila("Historia", 13, 29, "-", "-", "-", "-")}
              ${crearFila("Filosofía y Soc.", "-", "-", "-", "-", "-", 45)}
              ${crearFila("Ciencias Nat.", 6, "-", "-", "-", "-", "-")}
              ${crearFila("Química", 14, 22, "-", "-", "-", "-")}
              ${crearFila("Física", 30, 38, "-", "-", "-", "-")}
              ${crearFila("Biología", "-", "-", "-", "-", "-", 46)}
              ${crearFila("Inglés", 7, 15, 23, 31, 39, 47)}
              ${crearFila("Derechos de la Mujer", 8, 16, 24, "-", "-", "-")}
              ${crearFila("Conducta", 9, 17, 25, 33, 41, 49)}
              
              <tr style="background:#e8f0fe;font-weight:bold;">
                <td style="padding:12px;border:2px solid #1a73e8;">PROMEDIO GENERAL</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(10))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(18))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(26))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(34))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(42))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(50))}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>`;

    resultado.innerHTML = html;

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "⚠️ Error crítico al conectar con la base de datos.";
  }
}

function exportarPDF(nombre, cedula, seccion) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const fecha = new Date().toLocaleDateString();

  doc.setFontSize(14);
  doc.text("INSTITUTO NACIONAL PÚBLICO ROSA MONTOYA FLORES", 105, 15, { align: "center" });
  doc.setFontSize(11);
  doc.text(`Estudiante: ${nombre} | Cédula: ${cedula} | Sección: ${seccion}`, 14, 30);

  doc.autoTable({
    html: "#tabla-notas",
    startY: 40,
    theme: "grid",
    headStyles: { fillColor: [26, 115, 232] },
    styles: { fontSize: 8 }
  });

  doc.save(`Boleta_${nombre}.pdf`);
}



