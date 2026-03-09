const SHEET_ID = "1j9FQ5sCX2X2hJC99pBPU44bPGbSwvf2XFulxwvJXFxs";
const SHEET_GID = "1440602211";

async function buscarNotas() {

  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!codigo) {
    resultado.innerHTML = "<p style='color:red;font-weight:bold;'>⚠️ Ingresa un código.</p>";
    return;
  }

/* CARGA DE RESULTADO*/
resultado.innerHTML = `
  <div class="spinner-container">
    <div class="spinner"></div>
    <p style="color:black;margin-top:15px;">Consultando notas...</p>
  </div>
`;

const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

  try {

    const res = await fetch(url);
    const text = await res.text();
    const filas = text.split("\n").map(f => f.split(","));

    let estudiante = null;

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
    <div class="fade-slide" style="margin-top:30px;">

        <h2 style="color:#1a73e8;">📋 ${safe(1)}</h2>
        <div><strong>🆔 Cédula:</strong> ${safe(2)}</div>
        <div><strong>🏫 Sección:</strong> ${safe(39)}</div>
        <div><strong>🏫 Centro Educativo:</strong> Instituto Nacional Público Rosa Montoya Flores</div>

        <button onclick="exportarPDF('${safe(1)}','${safe(2)}','${safe(39)}')" 
        style="margin:15px 0;background:#1a73e8;color:white;
        border:none;padding:10px 20px;border-radius:6px;
        cursor:pointer;font-weight:bold;">
        📄 Exportar PDF
        </button>

        <div class="responsive-table-container">

    <table id="tabla-notas" style="width:100%;border-collapse:collapse;margin-top:15px; table-layout:fixed;">
        <thead>
          <tr style="background:#1a73e8;color:white;">
            <th style="width:30%;padding:12px;border:1px solid #ccc;text-align:left;">Materia</th>
            <th style="width:11.6%;border:1px solid #ccc;text-align:center;">I Cuatri</th>
            <th style="width:11.6%;border:1px solid #ccc;text-align:center;">II Cuatr</th>
            <th style="width:11.6%;border:1px solid #ccc;text-align:center;">III Cuatr</th>
            <th style="width:11.6%;border:1px solid #ccc;text-align:center;">IV Cuatr</th>
            <th style="width:11.6%;border:1px solid #ccc;text-align:center;">V Cuatr</th>
            <th style="width:11.6%;border:1px solid #ccc;text-align:center;">VI Cuatr</th>
          </tr>
        </thead>
            <tbody>

              ${crearFila("Lengua y Literatura", 3,9,15,21,27,33)}
              ${crearFila("Matemática", 4,10,16,22,28,34)}
              ${crearFila("Geografía / Historia", 5,11,17,23,29,35)}
              ${crearFila("Ciencias / Química / Física", 6,12,18,24,30,36)}
              ${crearFila("Inglés", 7,13,19,25,31,37)}

              <tr style="background:#e8f0fe;font-weight:bold;">
                <td style="padding:12px;border:2px solid #1a73e8;">PROMEDIO GENERAL</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(8))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(14))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(20))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(26))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(32))}</td>
                <td style="text-align:center;border:2px solid #1a73e8;">${f(safe(38))}</td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>
    `;

    resultado.innerHTML = html;

    function crearFila(nombre,a,b,c,d,e,fIndex){
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
    }

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "⚠️ Error crítico al conectar con la base de datos.";
  }
}



/* ===== EXPORTAR PDF COMPLETO ===== */

function exportarPDF(nombre, cedula, seccion) {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fecha = new Date().toLocaleDateString();

  doc.setFontSize(16);
  doc.text("INSTITUTO NACIONAL PÚBLICO ROSA MONTOYA FLORES", 105, 15, { align: "center" });

  doc.setFontSize(14);
  doc.text("Registro de Calificaciones, Bachillerato Comunitario de JYA", 105, 22, { align: "center" });

  doc.setFontSize(11);
  doc.text(`Estudiante: ${nombre}`, 14, 35);
  doc.text(`Cédula: ${cedula}`, 14, 42);
  doc.text(`Sección: ${seccion}`, 14, 49);
  doc.text(`Fecha de emisión: ${fecha}`, 14, 56);

  doc.autoTable({
    html: "#tabla-notas",
    startY: 65,
    theme: "grid",
    headStyles: { fillColor: [26, 115, 232] },
    styles: { fontSize: 9 }
  });

  doc.save(`Boleta_${nombre}.pdf`);
}



