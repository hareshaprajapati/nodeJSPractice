// const http = require('http'); // ./ or / then use the local files

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// const db = require('./util/database');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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

app.use(bodyParser.urlencoded({ extended: false })); // extended for parse non default features, bodyParser to get request.body
app.use(express.static(path.join(__dirname, 'public'))); // forward request to public static folder 

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

// if no routes found then send 404 page
app.use('/', errorController.get404);



/* const server = http.createServer(app)
server.listen(3000); */

// if user deleted then delete Products,  by default On DELETE SET NULL ON UPDATE CASCADE
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // optional, if just set this and not set belongsTo then will set ON DELETE SET NULL ON UPDATE CASCADE in product table
User.hasOne(Cart); // will add userId in Cart table
// Cart.belongsTo(User); // optional

Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});


sequelize
    // .sync({ force: true})
    .sync()
    .then(res => {
        return User.findByPk(1);

    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'haresh', email: 'haresh@gmail.com' })
        }
        return user;
        // return Promise.resolve(user); // no need resturn Promise.resolve because anything return from then block will always be Promise

    })
    .then(user => {
        return user.createCart();
        
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => console.log(err));



// const routes = require('./routes')
// manual way to handle request using nodejs only
// const server = http.createServer(routes.requestListenerCallback);  // start event loop, event loop handle event callbacks,
//  if request comes execute this callback function, this is a event listener