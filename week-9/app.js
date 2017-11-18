const http = require('http');
const fs = require('fs');

fs.readFile('save.json', function(err, data){
  const res = JSON.parse(data)
  console.log(res.quotes)
})
// set hostname and port
const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer();

const quotesArr = [
  "A ship in port is safe, but that's not what ships are built for.",
  "A smile is the shortest distance between two people.",
  "Life is a great big canvas; throw all the paint on it you can.",
  "Not even computers will replace committees, because committees buy computers."
];

function jsonResponse(result, obj){
  // convert obj to string
  result.write(JSON.stringify(obj));
  result.end();
}

function randomQuote(){
  return quotesArr[Math.floor(Math.random() * quotesArr.length)]
}

// when request comes in, return result
server.on('request', function(request, result){
  console.log('method', request.method);
  console.log('url', request.url);
  result.setHeader('Content-Type', 'text/json');

  result.setHeader('Access-Control-Allow-Origin', '*');
  result.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  result.setHeader('Access-Control-Allow-Headers', '*');

  // handle GET requests
  if(request.method == 'GET'){
    if(request.url == '/quotes'){
      // json response
      const answer = { 'quotes': quotesArr }
      jsonResponse(result, answer);
    }

    else if( request.url == '/quotes/random'){
      jsonResponse(result, { 'random_quote' : randomQuote() })
    }
    else{
      result.end('nothing here')
    }
  }

  // handle POST requests
  else if (request.method == 'POST'){
    if(request.url == '/quotes/submit') {
      // receive data
      const body = [];
      request.on('data', function(chunk){
        // data comes in a form of a stream
        // we need to put it in a body buffer before using
        body.push(chunk)
      }).on('end', function(){
        // convert the buffer to a string
        const data = Buffer.concat(body).toString();

        // start using data here
        // get quote value
        const newQuote = data.split('=')[1].replace(/\+/g, ' ')
        quotesArr.push(newQuote);
        console.log(data)
        result.write(data)
        result.end();
      });

    }
  }

  // welcome message
  else {
    //example of HTML response
    result.write('<p>hi, welcome to quotes API. visit /quotes to start</p>');
    result.end();
  }

})

// start listening for requests
server.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('hi')
});