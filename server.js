// Author:            Sean Boisselle
// Submission Date:   08.30.2017
// This code creates a server and provides listing data from a JSON file.
// It makes use of the HTTP, URL and File System modules in Node.js

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;
/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  //This decision structure only displays JSON data if a specified pathname is found.

  if (parsedUrl.pathname != '/listings' ) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
		  response.write("Bad gateway error");
		  response.end();
  } else if (parsedUrl.pathname == '/listings' ) {
		  response.writeHead(200, {'Content-Type': 'application/json'})
		  response.write(listingData);
		  response.end();
	}
};

server = http.createServer(requestHandler);

// This is a basic use case of the File System module in which the server
// listens for incoming requests and outputs data in the form of the given
// JSON file if an error is not found.

fs.readFile('listings.json', 'utf8', function(err, data)
{
	if (err)
	{
		  console.log(err);
		  return;
	}
	else
	{
	    listingData = data;
	    server.listen(port);
	    console.log("Server started. Listening on: http://localhost:" + port);
	}
});
