// Snippets de código para poder componer el programa

//!Usado?: 
  const middlewares = require('./middlewares');
//--- Explicación: importa los middlewares definidos en middlewares.js (funciones de validación 
// y autentificación)

// -------------------------------------------------------------------------------------

//!Usado?: 
const bodyParser = require('body-parser');
//--- Explicación: Middleware que procesa información introducida en una solicitud, por ejemplo 
// un formulario.

// -------------------------------------------------------------------------------------

//!Usado?: 
const session = require('express-session');
//--- Explicación: componente en middlewares que almacena la información durante una sesión que 
// se activa cuando el usuario ha introducido la palabra correcta.

// -------------------------------------------------------------------------------------

//!Usado?: 
const express = require('express');
//--- Explicación: Framework que permite construir aplicaciones web y manejar los flujos de 
// información manejando rutas.

// -------------------------------------------------------------------------------------

//*?Usado?: 
const bodyParser = require('body-parser');
//--- Explicación: Convertir datos a un formato más fácil de procesar, analizar y compartir.

// -------------------------------------------------------------------------------------

//*?Usado?: 
const session = require('express-session');
//--- Explicación:  

// -------------------------------------------------------------------------------------

//!Usado?: 
const dotenv = require('dotenv');
//--- Explicación: Cargas las variables del archivo '.env' para trabajar con esos datos.

// -------------------------------------------------------------------------------------

//*Usado?: 
const middlewares = require('./middlewares');
//--- Explicación: 

// -------------------------------------------------------------------------------------

//!Usado?: 
const routes = require('./routes');
//--- Explicación: Importa las rutas del archivo routes.js para poder entrar en función
// de las solicitudes.

// -------------------------------------------------------------------------------------

//!Usado?: 
dotenv.config();
//--- Explicación: Cargar el contenido del archivo .env

// -------------------------------------------------------------------------------------

//!Usado?: 
const app = express();
//--- Explicación: Instacia para hacer uso de Express, gestiona rutas y middlewares.

// -------------------------------------------------------------------------------------

//!Usado?: 
const PORT = 4000;
//--- Explicación: Puerto del servidor en el que se escuchan las solicitudes.

// -------------------------------------------------------------------------------------

//*Usado?: 
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//*Usado?:
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//!Usado?:
middlewares.setupApp(app);
//--- Explicación: Los datos almacenados en setupApp de la sesión configurados con bodyParse 
// se analizan tras ser convertidos en un objeto.

// -------------------------------------------------------------------------------------

//!Usado?:
routes.setup(app);
//--- Explicación:  Configura las rutas

// -------------------------------------------------------------------------------------

//*?Usado?:
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Función para verificar si la palabra introducida es correcta.


// -------------------------------------------------------------------------------------


//*Usado?:
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: Desde ruta "/" lleva a "/profile" si la palabra es correcta o le lleva a "/" 
// para introducirla de nuevo si no lo es.


// -------------------------------------------------------------------------------------


//*Usado?:
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: Envía formulario para ingresar la palabra secreta.


// -------------------------------------------------------------------------------------

//*?Usado?:
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: Configura los middlewares almacenando los datos de la sesión como 
// objetos.


// -------------------------------------------------------------------------------------

//*Usado?:
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Redirige a la página del perfil cuando se confirma que la palabra 
// es correcta.

// -------------------------------------------------------------------------------------

//!Usado?:
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: Configuración de bodyParser

// -------------------------------------------------------------------------------------

//!Usado?:
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: Usas los datos almacenados en la sesión

// -------------------------------------------------------------------------------------

//!Usado?:
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Escucha el puerto para tramitar las solicitudes

// -------------------------------------------------------------------------------------

//*?Usado?:
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Verifica si la sesión está en marcha con la palabra secreta y lanza
// un error si no lo está.

// -------------------------------------------------------------------------------------


//*Usado?:
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación:  Muestra la página del perfil si la sesión está activa.

// -------------------------------------------------------------------------------------


//*Usado?:
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Al cerrar sesión, elimina los datos de sesión y redirige a la 
// página principal.

// -------------------------------------------------------------------------------------

//*Usado?:
module.exports = {
  setup,
};
//--- Explicación: Exportar módulo setup para poder utilizarlos en otros archivos.

// -------------------------------------------------------------------------------------

//*? Usado?:
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exportar las funciones de middleware para poder utilizarlos en 
// otros archivos.

// -------------------------------------------------------------------------------------