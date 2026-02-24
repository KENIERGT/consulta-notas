// Reemplaza la parte de la tabla en tu función buscarNotas con este mapeo exacto:

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
        <td>${f(estudiante.c[3]?.v)}</td>
        <td>${f(estudiante.c[9]?.v)}</td>
        <td>${f(estudiante.c[15]?.v)}</td>
        <td>${f(estudiante.c[21]?.v)}</td>
      </tr>
      <tr>
        <td>Matemática</td>
        <td>${f(estudiante.c[4]?.v)}</td>
        <td>${f(estudiante.c[10]?.v)}</td>
        <td>${f(estudiante.c[16]?.v)}</td>
        <td>${f(estudiante.c[22]?.v)}</td>
      </tr>
      <tr>
        <td>Geografía / Historia</td>
        <td>${f(estudiante.c[5]?.v)}</td>
        <td>${f(estudiante.c[11]?.v)}</td>
        <td>${f(estudiante.c[17]?.v)}</td>
        <td>${f(estudiante.c[23]?.v)}</td>
      </tr>
      <tr>
        <td>Ciencias / Química / Física</td>
        <td>${f(estudiante.c[6]?.v)}</td>
        <td>${f(estudiante.c[12]?.v)}</td>
        <td>${f(estudiante.c[18]?.v)}</td>
        <td>${f(estudiante.c[24]?.v)}</td>
      </tr>
      <tr>
        <td>Inglés</td>
        <td>${f(estudiante.c[7]?.v)}</td>
        <td>${f(estudiante.c[13]?.v)}</td>
        <td>${f(estudiante.c[19]?.v)}</td>
        <td>${f(estudiante.c[25]?.v)}</td>
      </tr>
      <tr style="background-color: #f2f2f2; font-weight: bold;">
        <td>Promedio</td>
        <td>${f(estudiante.c[8]?.v)}</td>
        <td>${f(estudiante.c[14]?.v)}</td>
        <td>${f(estudiante.c[20]?.v)}</td>
        <td>${f(estudiante.c[26]?.v)}</td>
      </tr>
    </tbody>
  </table>
`;


