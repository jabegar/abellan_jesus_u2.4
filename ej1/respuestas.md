# 1. Al recargar, en la terminal aparece a veces GET /favicon.ico. ¿Quién hace esa petición y qué le responde tu servidor?
El favicon.ico es una petición que hace el navegador y el servidor le responde 404.
# 2. Si escribes la hora directamente como valor dentro del objeto de rutas, siempre sale la misma. ¿Por qué ocurre?
Al escribir la hora directamente se establece una sola vez cuando se crea el objeto, así que no se actualiza al recargar la página.