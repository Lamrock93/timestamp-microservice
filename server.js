// Load express and cors and create an app using these technologies to allow different sites to communicate with one another
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// This enables use of the style sheet
app.use('/public', express.static(process.cwd() + '/public'));

// This allows the front end to be accessible
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// This application will run through thankful-den/api/timestamp/(date entry)
// All code being run under the /api/timestamp/ url goes inside this function
app.route('/api/timestamp/:date?') // User Story 1
  .get( (req, res) => {
    
    // Initialize date variable equal to whatever the date parameter is
    var date = req.params.date;

    // If nothing is written in the date field, then post the current date in UTC and unix form
    if (req.params.date === undefined) { // User Story 3
      var unixDate = Date.now();
      var formattedDate = new Date().toUTCString();
  
    } else {
      
      // Check if it's a unix date by seeing if the string is an integer
      var checkDate = parseInt(req.params.date * 1);
      
      // If it is an integer, interpret is as unix, otherwise, interpret as a regular date
      if (isNaN(checkDate) === false) {
        date = new Date(checkDate);
      } else {
        date = new Date(req.params.date)
      }
      // create unix and formatted date variables in appropriate formats
      var unixDate = date.getTime();
      var formattedDate = date.toUTCString(); // User Story 2
    }
    
    // If Date field isn't empty, in UTC form or in Unix form, it is invalid
    if (formattedDate == "Invalid Date") {
      res.json({error: formattedDate}) // User Story 5
    } else {
      res.json({unix: unixDate, utc: formattedDate}) // User Story 4
    }
  
  });

// Port 3000 is listening...
app.listen(3000, () => {});