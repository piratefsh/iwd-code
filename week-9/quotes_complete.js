const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

const quotesArr = [
      "A ship in port is safe, but that's not what ships are built for.",
      "A smile is the shortest distance between two people.",
      "Life is a great big canvas; throw all the paint on it you can.",
      "Not even computers will replace committees, because committees buy computers."
    ];
function getQuotesJSON(){
  return JSON.stringify({quotes: quotesArr})
}

function randomQuote(){
  return quotesArr[Math.floor(Math.random() * quotesArr.length)]
}

// call this function when server gets request
server.on('request', function(request, result){

  // respond differently based on URL
  if(request.url == '/quotes'){
    result.statusCode = 200;

    //return json with quotes array
    result.setHeader('Content-Type', 'text/json');
    result.write(getQuotesJSON());
    result.end();
  }

  // respond differently based on URL
  else if(request.url == '/quotes/random'){
    result.statusCode = 200;

    //return json with quotes array
    result.setHeader('Content-Type', 'text/json');
    result.setHeader("Access-Control-Allow-Origin", request.headers.origin);
    result.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    result.setHeader('Access-Control-Allow-Headers', '*');
    console.log('here')
    result.write(JSON.stringify({quote: randomQuote()}));
    result.end();
  }

  else if (request.url == '/quotes/new') {
    let body = []

    // receive data
    request.on('data', function(data){
      // data comes in a form of a stream
      // we need to put it in a body buffer before using
      body.push(data)
    }).on('end', function(){
      // convert the buffer to a string
      const data = Buffer.concat(body).toString();

      // get the quote in the quote=abc format
      const quote = data.split('=')[1];

      // if quote is a string, add it to array
      if(typeof quote == 'string'){
        result.statusCode = 200;
        quotesArr.push(quote)
        result.end(getQuotesJSON())
      } else{
        result.statusCode = 400;
        result.end('Bad data format. Must be in format of quote="example here"')
      }
    })
  }
  else{
    result.statusCode = 404;
    result.setHeader('Content-Type', 'text/plain');
    result.end(`Error: ${request.url}  is not a valid endpoint\n`);
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});