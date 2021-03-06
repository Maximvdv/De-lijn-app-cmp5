// server.js
// load the things we need
var express = require('express');
var request = require('request');
var app = express();

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', {});
});

app.get("/registreer", function(req, res) {
    res.render("registreer");
});

app.get("/aanmelden", function(req, res) {
    res.render("aanmelden");
});

app.get("/opties", function(req, res) {
    res.render("opties");
});

app.get("/routeplanner", function(req, res) {
    res.render("routeplanner");
});

app.get("/haltes", function(req, res) {
    res.render("haltes");
});

app.get("/lijnen", function(req, res) {
    res.render("lijnen");
});

app.get("/verkooppunten", function(req, res) {
    res.render("verkooppunten");
});

app.get("/berekenhalte", function (req, res) {
    res.render("berekenhalte");
});

app.get("/zoekverkooppunt", function (req, res) {
    res.render("zoekverkooppunt");
});




// verkooppunten *working*

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
            <h5> Adres: ${a.adresString} </h5>
            <hr>
          `;
            }
        }
        res.render('verkooppunten', {
            verkoopDisplay: `${gegevens}`,
        });
    });
});

// gemeentelijnen *working*

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

// halteinformatie *not working*

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
            <h2> ${a.bestemming} </h2>
            <h2> ${a.bestemmingen} </h2>
            <h2> ${a.beschrijvingGemeente} </h2>
            <hr>
          `;
            }
        }
        res.render('halteinformatie', {
            halteInfoDisplay: `${gegevens}`,
        });
    });
});

//berekenRoute *not working*

app.post('/berekenRoute', function (req, res) {
    // console.log(req.body.verkoopstad);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/reisadvies/routes/' + req.body.startpunt + '/' + req.body.eindpunt + '/' +/* req.body.startx + '/' + req.body.starty + '/' + req.body.endx + '/' + req.body.endy  + */'/' + req.body.datum + '/' + req.body.tijdstip + '/' + req.body.vertrekken + '/' + req.body.aankomen + '/' + req.body.bus + '/' + req.body.tram + '/' + req.body.metro + '/' + req.body.trein + '/' + req.body.belbus, function (error, response, body) {
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
            <h2> ${a.afstand} </h2>
            <h2> ${a.aankomstLocatie} </h2>
            <hr>
          `;
            }
        }
        res.render('berekenRoute', {
            berekenRouteDisplay: `${gegevens}`,
        });
    });
});

//doorkomendeLijnen *working*

app.post('/doorkomendeLijnen', function (req, res) {
    // console.log(req.body.verkoopstad);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/haltes/doorkomendelijnen/' + req.body.halteId, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er zijn geen doorkomende lijnen gevonden voor ${req.body.halteId}</p>
        `;
        }
        else {

            gegevens += `
          <h2> verkooppunten in de gemeente ${req.body.halteId}</h2>
        `;
            for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <h2> Eindbestemming: ${a.bestemming} </h2>
            <h3> Lijn ${a.lijnNummer} komt hier langs </h3>
            <h5> Richting: ${a.lijnRichting} </h5>
            <hr>
          `;
            }
        }
        res.render('doorkomendeLijnen', {
            doorkomendeLijnenDisplay: `${gegevens}`,
        });
    });
});

//vertrekkendeLijnen *not working*

app.post('/vertrekkendeLijnen', function (req, res) {
    // console.log(req.body.verkoopstad);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/haltes/vertrekken/' + req.body.halteId + '/' + 5, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er zijn geen vertekkende lijnen gevonden voor ${req.body.halteId}</p>
        `;
        }
        else {

            gegevens += `
          <h2> Vertrekkende lijnen voor halte ${req.body.halteId}</h2>
        `;

            const { vertrekken } = data
            vertrekken.forEach( vertrekPunt => {
                const { lijnen } = vertrekPunt
                lijnen.forEach(lijn => {
                    console.log(vertrekken);
                    gegevens += `
                  <div><p>${lijn.lijnNummer} | ${lijn.vertrekTijd}</p></div>
                  `
                })
            })

        }

            /*for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <h2> ${a.lijnen.lijnNummer} </h2>  <!--Hoe kan ik de nested array opvragen hier?-->
            <h3> Lijntype: ${lijnType} </h3>
            <h5> Richting: ${a[{lijnRichting}]} </h5>
            <h5> Vertrekt om: ${a[lijnen.vertrekTijd]} </h5>
            <hr>
          `;
            }*/
        })

        res.render('vertrekkendeLijnen', {
            vertrekkendeLijnenDisplay: `${gegevens}`,
        });
    });


//zoekenHaltes *working*

app.post('/zoekenHaltes', function (req, res) {
    // console.log(req.body.verkoopstad);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-search/search/haltes/' + req.body.zoekHalte + '/' + 1, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er zijn geen haltes gevonden voor ${req.body.zoekHalte}</p>
        `;
        }
        else {
            gegevens += `
          <h2> haltes in de stad ${req.body.zoekHalte}</h2>
        `;
            const { haltes } = data
            haltes.forEach( halte => {
                const { lijnen } = halte
                lijnen.forEach(lijn => {
                    console.log(haltes);
                    gegevens += `
                  <div><p>${lijn.lijnNummer} | ${lijn.omschrijving}</p></div>
                  `
                })
            })

        }

        res.render('zoekenHaltes', {
            zoekenHaltesDisplay: `${gegevens}`,
        });
    });
});

//google maps request







//coord convert
// https://www.delijn.be/rise-api-core/locations/convert/{{lat}}/{{long}}
// maps coordinaten vb. lat = 51.2189652 && long = 4.399964   --> groenplaats


app.listen(8080);
