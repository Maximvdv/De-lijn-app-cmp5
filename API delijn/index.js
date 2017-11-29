// server.js
// load the things we need
var express = require('express');
var request = require('request');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', {});
});


// verkooppunten test

app.post('/verkooppunten', function (req, res) {
    // console.log(req.body.verkoopstad);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.verkoopstad, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er zijn geen verkooppunten gevonden in de gemeente ${req.body.verkoopstad}</p>
        `;
        }
        else {

            gegevens += `
          <h2> verkooppunten in de gemeente ${req.body.verkoopstad}</h2>
        `;
            for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <h2> ${a.gemeente} </h2>
            <h3> ${a.naam} verkoopt tickets </h3>
            <h5> Richting: ${a.adresString} </h5>
            <hr>
          `;
            }
        }
        res.render('verkooppunten', {
            verkoopDisplay: `${gegevens}`,
        });
    });
});

// gemeentelijnen test (waar kom ik aan ID ? wat verwijst dit naar)

app.post('/gemeentelijnen', function (req, res) {
    // console.log(req.body.lijnnummer);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/lijnen/gemeente/' + req.body.lijnnummer, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er zijn geen lijnen gevonden met nummer ${req.body.lijnnummer}</p>
        `;
        }
        else {

            gegevens += `
          <h2> Lijnen met nummer ${req.body.lijnnummer}</h2>
        `;
            for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <h2> ${a.lijnNummer} </h2>
            <h3> ${a.bestemming} is de bestemming </h3>
            <h5> Richting: ${a.lijnRichting} </h5>
            <hr>
          `;
            }
        }
        res.render('gemeentelijnen', {
            lijnnummerdisplay: `${gegevens}`,
        });
    });
});

// (waar kom ik aan ID ? wat verwijst dit naar)

app.post('/halteinformatie', function (req, res) {
    // console.log(req.body.halteinfo);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/haltes/titel/' + req.body.halteinfo, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er is geen informatie gevonden over bushalte ${req.body.halteinfo}</p>
        `;
        }
        else {

            gegevens += `
          <h2> Informatie over bushalte ${req.body.halteinfo}</h2>
        `;
            for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <h2> ${a.entiteitNummer} </h2>
            <hr>
          `;
            }
        }
        res.render('halteinformatie', {
            halteInfoDisplay: `${gegevens}`,
        });
    });
});

app.post('/berekenRoute', function (req, res) {
    // console.log(req.body.verkoopstad);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/reisadvies/routes/' + req.body.startpunt + '/' + req.body.eindpunt /*+ '/' + req.body.startx + '/' + req.body.starty + '/' + req.body.endx + '/' + req.body.endy */ + '/' + req.body.datum + '/' + req.body.tijdstip + '/' + req.body.vertrekken + '/' + req.body.aankomen + '/' + req.body.bus + '/' + req.body.tram + '/' + req.body.metro + '/' + req.body.trein + '/' + req.body.belbus, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er is geen route gevonden</p>
        `;
        }
        else {

            gegevens += `
          <h2> uw route van ${req.body.startpunt} naar ${req.body.eindpunt} </h2>
        `;
            for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <h2> ${a.reiswegen} </h2>
            <hr>
          `;
            }
        }
        res.render('berekenRoute', {
            berekenRouteDisplay: `${gegevens}`,
        });
    });
});


app.listen(8080);
