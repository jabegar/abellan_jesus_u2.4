const http = require('http')

const server = http.createServer((req, res) => {
    var ruta = req.url;
    var method = req.method;

    console.log(method, ruta);

    if (ruta == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(`
            <h1>Inicio</h1>
            <p><a href='http://localhost:3000/sobre-mi'>Sobre mi</a></p>
            <p><a href='http://localhost:3000/aficiones'>Aficiones</a></p>
            <p><a href='http://localhost:3000/hora'>Hora</a></p>
            `)
    }
    else if (ruta == '/sobre-mi') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(`
            <h1>Jesús Abellán</h1>
            <p>Soy una persona responsable, trabajadora y con ganas de seguir aprendiendo y creciendo tanto a nivel personal como profesional. Tengo varios años de práctica en el sector y disfruto adquiriendo nuevos conocimientos y buscando soluciones a los problemas. Me gusta trabajar en equipo, aportar ideas y mejorar continuamente.</p>
            `)
    }
    else if (ruta == '/aficiones') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(`
            <h1>Aficiones</h1>
            <ul>
                <li>Aikido</li>
                <li>Escalada</li>
                <li>Senderismo</li>
            </ul>
            `)
    }
    else if (ruta == '/hora') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(`
            <h1>Hora</h1>
            <p>Son las ${new Date().toLocaleTimeString('es-ES')}</p>
            `)
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(`
            <h1>Error 404 NOT FOUND</h1>
            `)
    }
})

server.listen(3000)
