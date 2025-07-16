
const SHEET_ID = "1TnSKjSRX1vwBD1EjA9yRJw0sp8ezyhskQ_WXpKbqpA8";
const SHEET_GID = "1285346484";

    async function buscarNotas() {
      const codigo = document.getElementById('codigo').value.trim();
      const resultado = document.getElementById('resultado');
      resultado.innerHTML = "Buscando...";

      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

      try {
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows;

        let encontrado = false;

        function formatoNota(valor) {
          const nota = Number(valor);
          const color = nota <= 59 ? 'red' : 'black';
          return `<span style="color: ${color};">${nota.toFixed(1)}</span>`;
        }

        for (const row of rows) {
          const cod = row.c[1]?.v;
          if (cod && cod.trim() === codigo) {
            const nombre = row.c[0]?.v;
            const sesion = row.c[2]?.v;
            const mat = row.c[3]?.v;
            const lyl = row.c[4]?.v;
            const ingles = row.c[5]?.v;
            const quimica = row.c[6]?.v;
            const geo = row.c[7]?.v;
            const ddm = row.c[8]?.v;
            const promedio = row.c[9]?.v;

            resultado.innerHTML = `
              <h2>👤 ${nombre}</h2>
              <p><strong>Sección:</strong> ${sesion}</p>
              <p>➗ Matemática: ${formatoNota(mat)}</p>
              <p>📚 Lengua y Literatura: ${formatoNota(lyl)}</p>
              <p>🔤 Inglés: ${formatoNota(ingles)}</p>
              <p>🧪 Química: ${formatoNota(quimica)}</p>
              <p>🗺️ Geografía: ${formatoNota(geo)}</p>
              <p>👩 Der. y Dign. Mujer: ${formatoNota(ddm)}</p>
              <p><strong>📊 Promedio:</strong> ${formatoNota(promedio)}</p>
            `;
            encontrado = true;
            break;
          }
        }

        if (!encontrado) {
          resultado.innerHTML = "❌ Código no encontrado. Verifica e intenta de nuevo.";
        }

    } catch (error) {
    resultado.innerHTML = "⚠️ Error al conectar con la hoja. Revisa si el documento es público.";
    console.error(error);
    }
}