const http = require('http'); // ./ or / then use the local files

const routes = require('./routes')

const server = http.createServer(routes.requestListenerCallback);  // start event loop, event loop handle event callbacks,
//  if request comes execute this callback function, this is a event listener
 

server.listen(3000);