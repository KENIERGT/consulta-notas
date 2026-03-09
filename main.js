const SHEET_ID = "1j9FQ5sCX2X2hJC99pBPU44bPGbSwvf2XFulxwvJXFxs";
const SHEET_GID = "1138138025"; 

async function buscarNotas() {
    const codigo = document.getElementById("codigo").value.trim();
    const resultado = document.getElementById("resultado");

    if (!codigo) {
        resultado.innerHTML = "<p style='color:red;'>⚠️ Ingrese una cédula.</p>";
        return;
    }

    resultado.innerHTML = `<p>Cargando historial completo...</p>`;

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

    try {
        const res = await fetch(url);
        const text = await res.text();
        const filas = text.split("\n").map(l => l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));

        let estudiante = null;
        for (let i = 1; i < filas.length; i++) {
            let cedulaCelda = filas[i][2] ? filas[i][2].replace(/"/g, "").trim() : "";
            if (cedulaCelda.toUpperCase() === codigo.toUpperCase()) {
                estudiante = filas[i];
                break;
            }
        }

        if (!estudiante) {
            resultado.innerHTML = "❌ No se encontró el registro.";
            return;
        }

        const safe = (i) => (estudiante[i] ? estudiante[i].replace(/"/g, "").trim() : "-");
        const f = (valor) => {
            if (!valor || valor === "-" || valor === "") return "-";
            const num = parseFloat(valor.replace(",", "."));
            return (!isNaN(num) && num < 60) ? `<span style="color:red;font-weight:bold;">${valor}</span>` : valor;
        };

        // Función para generar cada fila de materia por separado
        const fila = (nom, p1, p2, p3, p4, p5) => `
            <tr>
                <td style="text-align:left;"><strong>${nom}</strong></td>
                <td>${f(safe(p1))}</td>
                <td>${f(safe(p2))}</td>
                <td>${f(safe(p3))}</td>
                <td>${f(safe(p4))}</td>
                <td>${f(safe(p5))}</td>
            </tr>`;

        resultado.innerHTML = `
            <div style="background:white; padding:20px; border-radius:10px; border:1px solid #ddd;">
                <h3>${safe(1)}</h3>
                <p>Cédula: ${safe(2)}</p>
                <table style="width:100%; border-collapse:collapse; text-align:center;">
                    <thead>
                        <tr style="background:#1a73e8; color:white;">
                            <th>MATERIA</th>
                            <th>I</th><th>II</th><th>III</th><th>IV</th><th>V</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${fila("Lengua y Literatura", 3, 11, 19, 27, 35)}
                        ${fila("Matemática", 4, 12, 20, 28, 36)}
                        ${fila("Geografía", 5, 13, 21, 29, 37)}
                        ${fila("Ciencias Naturales", 6, "-", "-", "-", "-")}
                        ${fila("Química", "-", 14, 22, 30, 38)}
                        ${fila("Física", "-", "-", 30, 38, "-")}
                        ${fila("Biología", "-", "-", "-", "-", 46)}
                        ${fila("Filosofía y Soc.", "-", "-", "-", "-", 45)}
                        ${fila("Inglés", 7, 15, 23, 31, 39)}
                        ${fila("Conducta", 9, 17, 25, 33, 41, 49)}
                        <tr style="background:#f1f3f4; font-weight:bold;">
                            <td>PROMEDIO GENERAL</td>
                            <td>${f(safe(10))}</td><td>${f(safe(18))}</td><td>${f(safe(26))}</td><td>${f(safe(34))}</td><td>${f(safe(42))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    } catch (e) {
        resultado.innerHTML = "⚠️ Error al conectar con el servidor.";
    }
}


