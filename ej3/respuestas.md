# 1. Si reinicias el servidor y visitas /firmas, ¿qué ha pasado con las firmas y por qué?
Las firmas desaparecen porque se almacenan en un array en memoria
# 2. ¿Por qué let cuerpo = '' tiene que declararse dentro de la función que atiende cada petición?
Porque cada POST tiene su propio cuerpo, si usamos una variable fuera, podrian pasar datos que no queremos a otras peticiones
# 3. Si el formulario tuviera required en todos sus campos, ¿haría falta validar igualmente en el servidor?
Si, ya que el required es algo que valida el navegador pero eso no garantiza que los datos recibidos sean los correctos, por lo que debemos asegurarnos desde el servidor.
# 4. Firma con el nombre ```<h1 style="color:red">Hola</h1>```. ¿Qué aparece en la página de agradecimiento? ¿Por qué es un problema de seguridad?
Aparece el texto como h1 y en rojo. Es un problema porque se podria introducir codigo javascript malicioso desde el navegador de cualquier usuario