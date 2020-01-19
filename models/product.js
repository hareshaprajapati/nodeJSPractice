const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const p = path.join(rootDir,'data','products.json');

const getProductsFromFile = cb => {
    
    fs.readFile(p, (error, fileContent) => {
        let products = [];
        if(!error && fileContent.length > 0 ){
            products = JSON.parse(fileContent);
        }
        cb(products);
    });
}

module.exports = class Product {

    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(rootDir,'data','products.json');
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(error) => {
                if(error){
                    console.log(error);
                }
            });
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}