// server.js
// load the things we need
var express = require('express');
var request = require('request');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('index', {
    });
});


// verkooppunten test

app.post('/verkooppunten', function(req, res) {
    // console.log(req.body.verkoopstad);
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.verkoopstad, function (error, response, body) {
      var d = JSON.parse(body);
      console.log(d);

      if (d === null) {
        s_d += `
        <p> Er zijn geen verkooppunten gevonden in de gemeente ${req.body.verkoopstad}</p>
        `;
      }
      else {

        s_d += `
          <h2> verkooppunten in de gemeente ${req.body.verkoopstad}</h2>
        `;
        for (var i = 0; i < d.length; i++) {
          var a = d[i];
          s_d += `
            <h2> ${a.gemeente} </h2>
            <h3> ${a.naam} verkoopt tickets </h3>
            <h5> Richting: ${a.adresString} </h5>
            <hr>
          `;
        }
      }
      res.render('verkooppunten', {
        verkoop: `${s_d}`,
      });
    });
});

app.post('/gemeentelijnen', function(req, res) {
    // console.log(req.body.lijnnummer);
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/lijnen/gemeente/' + req.body.lijnnummer, function (error, response, body) {
        var d = JSON.parse(body);
        console.log(d);

        if (d === null) {
            s_d += `
        <p> Er zijn geen lijnen gevonden met nummer ${req.body.lijnnummer}</p>
        `;
        }
        else {

            s_d += `
          <h2> Lijnen met nummer ${req.body.lijnnummer}</h2>
        `;
            for (var i = 0; i < d.length; i++) {
                var a = d[i];
                s_d += `
            <h2> ${a.lijnNummer} </h2>
            <h3> ${a.bestemming} is de bestemming </h3>
            <h5> Richting: ${a.lijnRichting} </h5>
            <hr>
          `;
            }
        }
        res.render('gemeentelijnen', {
            lijnnummerdisplay: `${s_d}`,
        });
    });
});




app.listen(8080);
