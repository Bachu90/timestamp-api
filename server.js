// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  if (req.params.date_string) {
    if (Boolean(1 * req.params.date_string)) {
      const date = new Date(1 * req.params.date_string);
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    } else if (Boolean(Date.parse(req.params.date_string))) {
      const date = new Date(req.params.date_string);
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    } else {
      res.json({ unix: null, utc: "Invalid Date" });
    }
  } else {
    const time = new Date();
    res.json({ unix: time.getTime(), utc: time.toUTCString() });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});