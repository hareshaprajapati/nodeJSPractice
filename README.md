# nodeJSPractice

npm init
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  }

npm i nodemon --save-dev - to auto restart server while changing code
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },

  .vscode -> launch.json - to auto restart debuging while changing code, install nodemon with -g globally
            "program": "${workspaceFolder}\\app.js",
            "restart": true,
            "runtimeExecutable": "nodemon",
            "console": "integratedTerminal"

npm i express

npm i body-parser // parse the body of the request

req.body.productId
req.params.productId
req.query.productId