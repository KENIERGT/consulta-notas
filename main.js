// ======================================================
// CONFIG — misma hoja y gid originales, sin cambios
// ======================================================
const PUB_ID  = "2PACX-1vSMzFZXCDvyI2fWADrHlEd5ZbKgm57HdxE74n-z6c6uWxNHTWOD8O14PsEV_2i3xv1klxdZq3PJhVqS";
const SHEET_GID = "1138138025";

// Materias -> columnas por bimestre (I..VI). Igual que el original.
const MATERIAS = [
  { nombre: "Lengua y Literatura",              cols: [3, 11, 19, 27, 35, 43] },
  { nombre: "Matemática",                       cols: [4, 12, 20, 28, 36, 44] },
  { nombre: "Geografía",                        cols: [5, null, 21, null, 37, null] },
  { nombre: "Historia",                         cols: [null, 13, null, 29, null, null] },
  { nombre: "Ciencias Naturales",                cols: [6, null, null, null, null, null] },
  { nombre: "Química Orgánica e Inorgánica",     cols: [null, 14, 22, null, null, null] },
  { nombre: "Física",                           cols: [null, null, null, 30, 38, null] },
  { nombre: "Biología",                         cols: [null, null, null, null, null, 46] },
  { nombre: "Filosofía y Sociología",           cols: [null, null, null, null, null, 45] },
  { nombre: "Inglés",                           cols: [7, 15, 23, 31, 39, 47] },
  { nombre: "Derechos y Dignidad de la Mujer",  cols: [8, 16, 24, null, null, null] },
  { nombre: "Conducta",                         cols: [9, 17, 25, 33, 41, 49] },
];

const COL_PROMEDIOS = [10, 18, 26, 34, 42, 50];

const COL = {
  nombre: 1,
  cedula: 2,
  codigoPersona: 53,
  edad: 55,
  seccion: 54,
  codigoEstudiante: 57,
  tutor: 59,
};

// ======================================================
// DOM refs
// ======================================================
const form        = document.getElementById("searchForm");
const input       = document.getElementById("codigo");
const searchBtn   = document.getElementById("searchBtn");
const btnLabel    = searchBtn.querySelector(".btn-label");
const btnSpinner  = searchBtn.querySelector(".btn-spinner");
const errorMsg    = document.getElementById("errorMsg");
const searchView  = document.getElementById("searchView");
const resultView  = document.getElementById("resultView");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  buscarNotas();
});

// ======================================================
// Helpers
// ======================================================
function setLoading(loading) {
  searchBtn.disabled = loading;
  btnLabel.textContent = loading ? "Buscando..." : "Buscar notas";
  btnSpinner.hidden = !loading;
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.hidden = false;
}

function clearError() {
  errorMsg.hidden = true;
  errorMsg.textContent = "";
}

function safe(fila, i) {
  return fila[i] ? fila[i].replace(/"/g, "").trim() : "-";
}

function esReprobado(valor) {
  if (!valor || valor === "-" || valor === "") return false;
  const num = parseFloat(String(valor).replace(",", "."));
  return !isNaN(num) && num < 60;
}

function parseCSV(text) {
  return text
    .split("\n")
    .map((l) => l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
}

// ======================================================
// Búsqueda principal
// ======================================================
async function buscarNotas() {
  const codigo = input.value.trim();
  clearError();

  if (!codigo) {
    showError("Ingresá una cédula.");
    return;
  }

  setLoading(true);
  resultView.hidden = true;

  const url = `https://docs.google.com/spreadsheets/d/e/${PUB_ID}/pub?gid=${SHEET_GID}&single=true&output=csv`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const filas = parseCSV(text);

    let estudiante = null;
    for (let i = 1; i < filas.length; i++) {
      const cedulaCelda = filas[i][COL.cedula]
        ? filas[i][COL.cedula].replace(/"/g, "").trim()
        : "";
      if (cedulaCelda.toUpperCase() === codigo.toUpperCase()) {
        estudiante = filas[i];
        break;
      }
    }

    if (!estudiante) {
      showError("❌ No se encontró el registro. Verificá la cédula ingresada.");
      setLoading(false);
      return;
    }

    renderBoleta(estudiante);
    searchView.hidden = true;
    resultView.hidden = false;
  } catch (e) {
    showError("⚠️ Error al conectar con el servidor. Intentá de nuevo.");
  } finally {
    setLoading(false);
  }
}

// ======================================================
// Render de la boleta
// ======================================================
function chipHTML(romano, valor) {
  const vacio = !valor || valor === "-";
  const fail = esReprobado(valor);
  const clase = ["chip", vacio ? "empty" : "", fail ? "fail" : ""]
    .filter(Boolean)
    .join(" ");
  return `
    <div class="${clase}">
      <span class="rn">${romano}</span>
      <span class="grade">${vacio ? "–" : valor}</span>
    </div>`;
}

function subjectRowHTML(nombre, valores) {
  const romanos = ["I", "II", "III", "IV", "V", "VI"];
  const chips = valores.map((v, i) => chipHTML(romanos[i], v)).join("");
  return `
    <div class="subject">
      <p class="subject-name">${nombre}</p>
      <div class="chips">${chips}</div>
    </div>`;
}

function renderBoleta(estudiante) {
  window.__ultimoEstudiante = estudiante;

  const nombre = safe(estudiante, COL.nombre);
  const cedula = safe(estudiante, COL.cedula);
  const codigoPersona = safe(estudiante, COL.codigoPersona);
  const edad = safe(estudiante, COL.edad);
  const seccion = safe(estudiante, COL.seccion);
  const codigoEstudiante = safe(estudiante, COL.codigoEstudiante);
  const tutor = safe(estudiante, COL.tutor);

  const promedios = COL_PROMEDIOS.map((c) => safe(estudiante, c));
  const promediosValidos = promedios.filter((v) => v !== "-" && v !== "");
  const promedioGeneral = promediosValidos.length
    ? (
        promediosValidos.reduce(
          (acc, v) => acc + parseFloat(String(v).replace(",", ".")),
          0
        ) / promediosValidos.length
      ).toFixed(1)
    : "-";

  const filasMaterias = MATERIAS.map((m) => {
    const valores = m.cols.map((c) => (c === null ? "-" : safe(estudiante, c)));
    return subjectRowHTML(m.nombre, valores);
  }).join("");

  const filaPromedio = subjectRowHTML("Promedio general", promedios);

  resultView.innerHTML = `
    <div class="boleta" id="boletaPrint">
      <div class="boleta-head">
        <div class="seal">
          <span class="num">${promedioGeneral}</span>
          <span class="lbl">Prom.</span>
        </div>
        <p class="boleta-eyebrow">Historial de calificaciones</p>
        <h2 class="boleta-name">${nombre}</h2>
        <div class="boleta-meta">
          <div><span class="k">Cédula</span><span class="v">${cedula}</span></div>
          <div><span class="k">Año y sección</span><span class="v">${seccion}</span></div>
          <div><span class="k">Código de persona</span><span class="v">${codigoPersona}</span></div>
          <div><span class="k">Código de estudiante</span><span class="v">${codigoEstudiante}</span></div>
          <div><span class="k">Edad</span><span class="v">${edad}</span></div>
          <div><span class="k">Tutor</span><span class="v">${tutor}</span></div>
        </div>
      </div>

      <div class="perforation"><div class="dashes"></div></div>

      <div class="boleta-body">
        <p class="section-label">Materias · I a VI Cuatrimestre</p>
        <div class="subjects">
          ${filasMaterias}
          <div class="average-row">${filaPromedio}</div>
        </div>
      </div>

      <div class="boleta-actions">
        <button class="btn-ghost" id="btnNueva">Nueva búsqueda</button>
        <button class="btn-secondary" id="btnPDF">Descargar PDF</button>
      </div>
    </div>
  `;

  document.getElementById("btnNueva").addEventListener("click", resetBusqueda);
  document.getElementById("btnPDF").addEventListener("click", () =>
    exportarPDF({
      nombre,
      cedula,
      seccion,
      codigoPersona,
      codigoEstudiante,
      edad,
      tutor,
      promedioGeneral,
    })
  );
}

function resetBusqueda() {
  resultView.hidden = true;
  resultView.innerHTML = "";
  searchView.hidden = false;
  input.value = "";
  input.focus();
}

// ======================================================
// Exportar PDF (jsPDF + autotable ya cargados en index.html)
// ======================================================
function exportarPDF(info) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Bachillerato Comunitario de JYA", 14, 16);
  doc.setFontSize(10);
  doc.text("Instituto Nacional Público Rosa Montoya Flores", 14, 22);

  doc.setFontSize(12);
  doc.text(`Estudiante: ${info.nombre}`, 14, 34);
  doc.setFontSize(10);
  doc.text(`Cédula: ${info.cedula}`, 14, 41);
  doc.text(`Año y sección: ${info.seccion}`, 14, 47);
  doc.text(`Código de persona: ${info.codigoPersona}`, 105, 41);
  doc.text(`Código de estudiante: ${info.codigoEstudiante}`, 105, 47);
  doc.text(`Edad: ${info.edad}`, 14, 53);
  doc.text(`Tutor: ${info.tutor}`, 105, 53);

  const body = MATERIAS.map((m) => {
    const estudianteRow = window.__ultimoEstudiante;
    const valores = m.cols.map((c) => (c === null ? "-" : safe(estudianteRow, c)));
    return [m.nombre, ...valores];
  });

  const promediosRow = ["Promedio general", ...COL_PROMEDIOS.map((c) => safe(window.__ultimoEstudiante, c))];
  body.push(promediosRow);

  doc.autoTable({
    startY: 60,
    head: [["Materia", "I", "II", "III", "IV", "V", "VI"]],
    body,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [22, 35, 63] },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index > 0) {
        const v = data.cell.raw;
        if (esReprobado(v)) {
          data.cell.styles.textColor = [178, 58, 46];
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  doc.save(`boleta_${info.cedula}.pdf`);
}
