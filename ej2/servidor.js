const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    let fichero;
    let codigo;

    const tipos = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8'
    };

    // Decidimos qué fichero corresponde a cada ruta
    if (req.url === '/') {
        fichero = 'index.html';
        codigo = 200;

    } else if (req.url === '/contacto') {
        fichero = 'contacto.html';
        codigo = 200;

    } else if (req.url === '/estilos.css') {
        fichero = 'estilos.css';
        codigo = 200;

    } else {
        fichero = '404.html';
        codigo = 404;
    }

    const ruta = path.join(__dirname, 'paginas', fichero);
    const extension = path.extname(ruta);

    // Leemos el fichero
    fs.readFile(ruta, 'utf8', (error, contenido) => {

        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain; charset=utf-8'
            });

            res.end('Error interno del servidor');
            return;
        }

        res.writeHead(codigo, {
            'Content-Type': tipos[extension]
        });

        res.end(contenido);
    });
})

server.listen(3000)
