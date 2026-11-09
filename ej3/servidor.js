const http = require('http')
const fs = require('fs')
const path = require('path')

var firmas = [];

const servidor = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    if (url.pathname == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        var ruta = path.join(__dirname, 'recursos', 'formulario.html');
        var datos = fs.readFileSync(ruta)
        res.end(datos)
    }

    else if (url.pathname == '/firmar') {
        if (req.method == 'POST') {
            let formData = '';
            req.on('data', bloque => {
                formData += bloque.toString();
            })

            req.on('end', () => {
                const parametros = new URLSearchParams(formData);
                const nombre = parametros.get('nombre').trim();
                const mensaje = parametros.get('mensaje').trim();

                if (!nombre || !mensaje) {
                    res.writeHead(400, {
                        'Content-Type': 'text/html; charset=utf-8'
                    });
                    res.end(`
                        <h1>Error 400</h1>
                        <p>El nombre y el mensaje son obligatorios.</p>
                        <a href="/">Volver</a>
                    `);

                    return;
                }
                else if (mensaje.length > 200) {
                    res.writeHead(400, {
                        'Content-Type': 'text/html; charset=utf-8'
                    });
                    res.end(`
                        <h1>Error 400</h1>
                        <p>El mensaje no puede tener mas de 200 caracteres.</p>
                        <a href="/">Volver</a>
                    `);

                    return;
                }
                else {
                    const firma = {
                        nombre: nombre,
                        mensaje: mensaje,
                        fecha: Date.now()
                    };
    
                    firmas.push(firma)
        
                    res.writeHead(201, {
                        'Content-Type': 'text/html; charset=utf-8'
                    });
                    res.end(`
                        <p>Gracias por firmar, ${escaparHTML(firma.nombre)}<p>
                        <p><a href="/">Inicio</a></p>
                    `)

                    return;
                }
            })
        }
        else if (req.method == 'GET'){
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });

            const nombreBuscado = url.searchParams.get('nombre');

            let resultado = firmas;

            if (nombreBuscado !== null) {
                resultado = firmas.filter(firma =>
                    firma.nombre === nombreBuscado
                );
            }

            res.end(JSON.stringify(resultado))
        }
    }
    else {
        res.writeHead(400, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(`
                <h1>Error 404 NOT FOUND</h1>
                <p><a href="/">Inicio</a></p>
            `)
    }
})

servidor.listen(3000);

function escaparHTML(texto) {
    var arreglo = texto.replaceAll('&', '&amp;')
    arreglo = arreglo.replaceAll('<', '&lt;')
    arreglo = arreglo.replaceAll('>', '&gt;')

    return arreglo
}