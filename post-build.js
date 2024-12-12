const fs = require('fs');
const path = require('path');

// Ruta al archivo index.html generado
const indexPath = path.join(__dirname, 'www', 'index.html');

// Código que deseas insertar
const scriptContent = `
<script>
  (function() {
    if (typeof globalThis === 'undefined') {
      Object.defineProperty(Object.prototype, 'globalThis', {
        get: function() {
          return this;
        },
        configurable: true
      });
    }
  })();
</script>
`;

// Leer el contenido del archivo index.html
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // Insertar el script antes de la etiqueta </body>
  const result = data.replace('</body>', `${scriptContent}</body>`);

  // Escribir el archivo index.html con el nuevo contenido
  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});