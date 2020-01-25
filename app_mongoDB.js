// const http = require('http'); // ./ or / then use the local files

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

// register view engine
app.set('view engine', 'ejs');
// register views folder 
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const feedRoutes = require('./routes/feed');

/* db.execute('SELECT * FROM products')
.then(res => {
    console.log(res[0]);
})
.catch(err => console.log(err)); */

app.use(bodyParser.urlencoded({ extended: false })); // extended for parse non default features, bodyParser to get request.body,
// x-www-form-urlencoded form of data
app.use(bodyParser.json()); // for application/json

app.use(express.static(path.join(__dirname, 'public'))); // forward request to public static folder 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((req, res, next) => {
    User.findById('5e2a410a1c9d440000662790')
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use('/feed', feedRoutes);

// if no routes found then send 404 page
app.use('/', errorController.get404);



/* const server = http.createServer(app)
server.listen(3000); */

mongoConnect(() => {
    app.listen(3000);
})
   

// const routes = require('./routes')
// manual way to handle request using nodejs only
// const server = http.createServer(routes.requestListenerCallback);  // start event loop, event loop handle event callbacks,
//  if request comes execute this callback function, this is a event listener