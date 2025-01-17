const express = require('express');
const cookieParser = require('cookie-parser');
const createErrors = require('http-errors');
const cors = require('cors');
const dotenv = require('dotenv')


let http = require('')
let app = express();
dotenv.config()

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'jade');

app.use(cors());
app.use(express.json({ limit: '512mb' }));
app.use(express.urlencoded({ extended: false, limit: '512mb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index', { title: process.env.COLOCARENELENV })
})

//cath 404 and forward to error handler
//error handler
app.use(function(req, res, next){next(createErrors(404))})
app.use(function (err, req, res){
  res.status(err.status || 500)
  res.render('error')
});

let port = normalizePort(process.env.PORT || 20047);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
  // debug('Listening on ' + bind);
}