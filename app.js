// const http = require('http'); // ./ or / then use the local files

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// const db = require('./util/database');


const app = express();

// register view engine
app.set('view engine', 'ejs');
// register views folder 
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* db.execute('SELECT * FROM products')
.then(res => {
    console.log(res[0]);
})
.catch(err => console.log(err)); */

app.use(bodyParser.urlencoded({extended: false})); // extended for parse non default features, bodyParser to get request.body
app.use(express.static(path.join(__dirname,'public'))); // forward request to public static folder 

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes); 

// if no routes found then send 404 page
app.use('/', errorController.get404);



/* const server = http.createServer(app)
server.listen(3000); */

app.listen(3000);


// const routes = require('./routes')
// manual way to handle request using nodejs only
// const server = http.createServer(routes.requestListenerCallback);  // start event loop, event loop handle event callbacks,
//  if request comes execute this callback function, this is a event listener