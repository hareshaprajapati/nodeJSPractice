// const http = require('http'); // ./ or / then use the local files

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); // extended for parse non default features, bodyParser to get request.body
app.use(express.static(path.join(__dirname,'public'))); // forward request to public static folder 

app.use('/admin',adminData.routes);
app.use(shopRoutes); 

// if no routes found then send 404 page
app.use('/', (req,res,next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});



/* const server = http.createServer(app)
server.listen(3000); */

app.listen(3000);


// const routes = require('./routes')
// manual way to handle request using nodejs only
// const server = http.createServer(routes.requestListenerCallback);  // start event loop, event loop handle event callbacks,
//  if request comes execute this callback function, this is a event listener