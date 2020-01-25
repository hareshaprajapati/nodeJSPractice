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

request.body.productId
request.params.productId /:productId
request.query.productId

response.status(200).json({message: 'SUCCESS'});

in client side js 
btn.parentNode.querySelector('[name=_csrf']).value; // to get the _csrf element value from the parentNode
const productElement = btn.closest('article'); // to get the closest element near the btn

fetch('url',{
  method: 'DELETE/POST',
  headers: {
    'csrf-token' : token,
    'Content-Type' : 'application/json'
  },
  body: JSON.stringify({
	"title" : "title",
	"content" : "contents"
  })
})
.then(result => result.json()) // to read the response body which is ReadableStream
.then(data => {
  productElement.parentNode.removeChild(productElement); // to remove the element from DOM
})