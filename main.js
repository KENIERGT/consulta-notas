// Función para manejar el formato y el color de las notas
    const formatNota = (valor) => {
      if (valor === null || valor === undefined || valor === "" || valor === 0) return "-";
      
      // Convertimos a número para comparar, manejando posibles comas por puntos
      const notaNum = parseFloat(valor.toString().replace(',', '.'));
      
      // Si la nota es menor o igual a 59.4, la ponemos en rojo
      if (notaNum <= 59.4) {
        return `<span style="color: #e74c3c; font-weight: bold;">${valor}</span>`;
      }
      return valor;
    };

    let html = `
      <div style="margin-top: 20px; padding: 15px; background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="font-size: 1.8rem; color: #1a73e8; margin-bottom: 20px;">
          📋 Notas de: ${estudiante.c[1]?.v}
        </h2>
        
        <table class="notas-table" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #eee; text-align: left;">
              <th style="padding: 10px;">Materia</th>
              <th>I Cuat.</th>
              <th>II Cuat.</th>
              <th>III Cuat.</th>
              <th>IV Cuat.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px;"><strong>Lengua y Literatura</strong></td>
              <td>${formatNota(estudiante.c[3]?.v)}</td>
              <td>${formatNota(estudiante.c[9]?.v)}</td>
              <td>${formatNota(estudiante.c[15]?.v)}</td>
              <td>${formatNota(estudiante.c[21]?.v)}</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Matemática</strong></td>
              <td>${formatNota(estudiante.c[4]?.v)}</td>
              <td>${formatNota(estudiante.c[10]?.v)}</td>
              <td>${formatNota(estudiante.c[16]?.v)}</td>
              <td>${formatNota(estudiante.c[22]?.v)}</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Geografía / Historia</strong></td>
              <td>${formatNota(estudiante.c[5]?.v)}</td>
              <td>${formatNota(estudiante.c[11]?.v)}</td>
              <td>${formatNota(estudiante.c[17]?.v)}</td>
              <td>${formatNota(estudiante.c[23]?.v)}</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Ciencias / Química / Física</strong></td>
              <td>${formatNota(estudiante.c[6]?.v)}</td>
              <td>${formatNota(estudiante.c[12]?.v)}</td>
              <td>${formatNota(estudiante.c[18]?.v)}</td>
              <td>${formatNota(estudiante.c[24]?.v)}</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Inglés</strong></td>
              <td>${formatNota(estudiante.c[7]?.v)}</td>
              <td>${formatNota(estudiante.c[13]?.v)}</td>
              <td>${formatNota(estudiante.c[19]?.v)}</td>
              <td>${formatNota(estudiante.c[25]?.v)}</td>
            </tr>
            
            <tr style="border-top: 3px solid #1a73e8;">
              <td style="padding: 20px 10px 10px 10px;"><strong>PROMEDIO</strong></td>
              <td style="padding-top: 20px;"><strong>${formatNota(estudiante.c[8]?.v)}</strong></td>
              <td style="padding-top: 20px;"><strong>${formatNota(estudiante.c[14]?.v)}</strong></td>
              <td style="padding-top: 20px;"><strong>${formatNota(estudiante.c[20]?.v)}</strong></td>
              <td style="padding-top: 20px; font-size: 1.2rem;"><strong>${formatNota(estudiante.c[26]?.v)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    resultado.innerHTML = html;
