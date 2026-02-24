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

    let encontrado = false;
    let html = "";

    // Función para colorear notas menores a 60 en rojo
    function formatoNota(valor) {
      const nota = Number(valor);
      const color = nota < 60 ? "red" : "black";
      return `<span style="color:${color}">${nota.toFixed(1)}</span>`;
    }

    for (const row of rows) {
      const cod = row.c[2]?.v; // Columna C = cédula

      if (cod && cod.trim() === codigo) {
        const nombre = row.c[1]?.v;
        encontrado = true;

        html += `<h2>👤 ${nombre}</h2>`;

        // --------- CUATRIMESTRE I ---------
        html += `<h3>📌 I Cuatrimestre</h3>
          <p>📖 Lengua I: ${formatoNota(row.c[3]?.v)}</p>
          <p>➗ Matemática I: ${formatoNota(row.c[4]?.v)}</p>
          <p>🧪 Ciencia y Natura I: ${formatoNota(row.c[5]?.v)}</p>
          <p>🔤 Inglés I: ${formatoNota(row.c[6]?.v)}</p>
          <p><strong>📊 PROM I:</strong> ${formatoNota(row.c[7]?.v)}</p>`;

        // --------- CUATRIMESTRE II ---------
        html += `<h3>📌 II Cuatrimestre</h3>
          <p>📖 Lengua II: ${formatoNota(row.c[8]?.v)}</p>
          <p>➗ Matemática II: ${formatoNota(row.c[9]?.v)}</p>
          <p>📜 Historia II: ${formatoNota(row.c[10]?.v)}</p>
          <p>🧪 Química II: ${formatoNota(row.c[11]?.v)}</p>
          <p><strong>📊 PROM II:</strong> ${formatoNota(row.c[12]?.v)}</p>`;

        // --------- CUATRIMESTRE III ---------
        html += `<h3>📌 III Cuatrimestre</h3>
          <p>📖 Lengua III: ${formatoNota(row.c[13]?.v)}</p>
          <p>➗ Matemática III: ${formatoNota(row.c[14]?.v)}</p>
          <p>🗺️ Geografía III: ${formatoNota(row.c[15]?.v)}</p>
          <p>🔤 Inglés III: ${formatoNota(row.c[16]?.v)}</p>
          <p><strong>📊 PROM III:</strong> ${formatoNota(row.c[17]?.v)}</p>`;

        // --------- CUATRIMESTRE IV ---------
        html += `<h3>📌 IV Cuatrimestre</h3>
          <p>📖 Lengua IV: ${formatoNota(row.c[18]?.v)}</p>
          <p>➗ Matemática IV: ${formatoNota(row.c[19]?.v)}</p>
          <p>📜 Historia IV: ${formatoNota(row.c[20]?.v)}</p>
          <p>⚛️ Física IV: ${formatoNota(row.c[21]?.v)}</p>
          <p><strong>📊 PROM IV:</strong> ${formatoNota(row.c[22]?.v)}</p>`;

        break;
      }
    }

    if (!encontrado) {
      html = "❌ Código no encontrado. Verifica e intenta otra vez.";
    }

    resultado.innerHTML = html;

  } catch (error) {
    resultado.innerHTML = "⚠️ Error al conectar con la hoja.";
    console.error(error);
  }
}
