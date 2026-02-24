async function buscarNotas() {
  const codigo = document.getElementById('codigo').value.trim();
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = "🔎 Buscando...";

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let estudiante = null;

    for (let row of rows) {
      const codFila = row.c[2]?.v; // Columna C es la Cédula
      if (codFila && codFila.toString().trim() === codigo) {
        estudiante = row;
        break;
      }
    }

    if (!estudiante) {
      resultado.innerHTML = "❌ Código no encontrado.";
      return;
    }

    // Función auxiliar para resaltar notas reprobadas (< 60)
    const validarNota = (nota) => {
      if (!nota || nota === "-") return "-";
      return nota < 60 ? `<span style="color:red; font-weight:bold;">${nota}</span>` : nota;
    };

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
            <td>${validarNota(estudiante.c[3]?.v)}</td>
            <td>${validarNota(estudiante.c[9]?.v)}</td>
            <td>${validarNota(estudiante.c[15]?.v)}</td>
            <td>${validarNota(estudiante.c[21]?.v)}</td>
          </tr>
          <tr>
            <td>Matemática</td>
            <td>${validarNota(estudiante.c[4]?.v)}</td>
            <td>${validarNota(estudiante.c[10]?.v)}</td>
            <td>${validarNota(estudiante.c[16]?.v)}</td>
            <td>${validarNota(estudiante.c[22]?.v)}</td>
          </tr>
          <tr>
            <td>Geografía / Historia</td>
            <td>${validarNota(estudiante.c[5]?.v)}</td>
            <td>${validarNota(estudiante.c[11]?.v)}</td>
            <td>${validarNota(estudiante.c[17]?.v)}</td>
            <td>${validarNota(estudiante.c[25]?.v)}</td>
          </tr>
          <tr>
            <td>Ciencias / Química / Física</td>
            <td>${validarNota(estudiante.c[6]?.v)}</td>
            <td>${validarNota(estudiante.c[12]?.v)}</td>
            <td>${validarNota(estudiante.c[18]?.v)}</td>
            <td>${validarNota(estudiante.c[24]?.v)}</td>
          </tr>
          <tr>
            <td>Inglés</td>
            <td>${validarNota(estudiante.c[7]?.v)}</td>
            <td>${validarNota(estudiante.c[13]?.v)}</td>
            <td>${validarNota(estudiante.c[19]?.v)}</td>
            <td>${validarNota(estudiante.c[23]?.v)}</td>
          </tr>
          <tr>
            <td><strong>PROMEDIO</strong></td>
            <td><strong>${validarNota(estudiante.c[8]?.v)}</strong></td>
            <td><strong>${validarNota(estudiante.c[14]?.v)}</strong></td>
            <td><strong>${validarNota(estudiante.c[20]?.v)}</strong></td>
            <td><strong>${validarNota(estudiante.c[26]?.v)}</strong></td>
          </tr>
        </tbody>
      </table>
    `;

    resultado.innerHTML = html;

  } catch (error) {
    resultado.innerHTML = "⚠️ Error al conectar con los datos.";
    console.error(error);
  }
}

