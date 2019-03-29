// server.js
// where your node app starts

// init project
var express = require('express');
var url = require('url');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp/:date_string?", function (req, res) {
  //Get last values from URL
  var parsedURL = (url.parse(req.url, true)).pathname.split("/").pop();
  
  if(parsedURL == 'timestamp' || parsedURL==''){
    //Get actual date
    dateFromURL = new Date();
    res.json({unix: dateFromURL.getTime(), utc: dateFromURL.toUTCString()});
  }else{
    //Parse values from URL to date
    var dateFromURL = new Date(parsedURL);
    
    if (dateFromURL == 'Invalid Date'){
      var dateFromURL = new Date(parseInt(parsedURL));
    }
    
    //Check if URL was a date
    if (dateFromURL=='Invalid date'){
      res.json({error: "Invalid Date"});      
    }else{
      res.json({unix: dateFromURL.getTime(), utc: dateFromURL.toUTCString()});
    }
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});