const path = require('path');

module.exports = path.dirname(process.mainModule.filename); // return the path of the mainModule file that is app.js