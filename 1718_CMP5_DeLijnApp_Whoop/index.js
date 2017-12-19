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



app.use(express.static('public'))

// Views render

app.get("/", function(req, res) {
  res.render("index");
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

app.get("/routes", function(req, res) {
  res.render("routes");
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

app.get("/zoeklijn", function (req, res) {
    res.render("zoeklijn");
});


//functionaliteiten API

// verkooppunten *working*

app.post('/zoekverkooppunt', function (req, res) {
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
            <h2 class="datatitle"> verkooppunten in de gemeente ${req.body.verkoopstad}</h2>
            <br>
                  `;
            for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <div class="apicontent">
            <p class="parameter1">  <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i> ${a.naam} </p>
            <p class="parameter2"> ${a.adresString} </p>
            <br>
            </div>
            <hr>
          `;
            }
        }
        res.render('zoekverkooppunt', {
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
          <h2 class="datatitle"> Lijnen met nummer ${req.body.lijnnummer}</h2>
          <br>
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


//doorkomendeLijnen *working*

app.post('/zoeklijn', function (req, res) {
    // console.log(req.body.verkoopstad);
    var gegevens = ' ';
    request('https://www.delijn.be/rise-api-core/haltes/doorkomendelijnen/' + req.body.haltestops, function (error, response, body) {
        var data = JSON.parse(body);
        console.log(data);

        if (data === null) {
            gegevens += `
        <p> Er zijn geen doorkomende lijnen gevonden voor ${req.body.haltestops}</p>
        `;
        }
        else {

            gegevens += `
          <h2 class="datatitle"> Lijnen die voorbij halte ${req.body.haltestops} komen</h2>
          <br>
        `;
            for (var i = 0; i < data.length; i++) {
                var a = data[i];
                gegevens += `
            <h2 class="lijnvar"> <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i> ${a.bestemming} </h2>
            <h2 class="lijnvar"> <i class="fa fa-bus" aria-hidden="true"> </i> Lijn ${a.lijnNummer} </h2>
            <h5 class="subtext"> <i class="fa fa-arrow-right" aria-hidden="true"></i> ${a.lijnRichting} </h5>
            <hr>
          `;
            }
        }
        res.render('zoeklijn', {
            doorkomendeLijnenDisplay: `${gegevens}`,
        });
    });
});

//vertrekkendeLijnen *not working*

/*/!*app.post('/vertrekkendeLijnen', function (req, res) {
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

        }*!/

      /!*for (var i = 0; i < data.length; i++) {
       var a = data[i];
       gegevens += `
       <h2> ${a.lijnen.lijnNummer} </h2>  <!--Hoe kan ik de nested array opvragen hier?-->
       <h3> Lijntype: ${lijnType} </h3>
       <h5> Richting: ${a[{lijnRichting}]} </h5>
       <h5> Vertrekt om: ${a[lijnen.vertrekTijd]} </h5>
       <hr>
       `;
       }*!/
    })

    res.render('vertrekkendeLijnen', {
        vertrekkendeLijnenDisplay: `${gegevens}`,
    });
});*/

//zoekenHaltes *working*

app.post('/berekenhalte', function (req, res) {
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
          <h2 class="datatitle"> Vervoer voor ${req.body.zoekHalte}</h2>
          <br>
        `;
            const { haltes } = data
            haltes.forEach( halte => {
                const { lijnen } = halte
                lijnen.forEach(lijn => {
                console.log(haltes);
            gegevens += `
                  <div class="apicontent"><p class="parameter1"> <h2 class="datanumber"> <i class="fa fa-bus" aria-hidden="true"></i> ${lijn.lijnNummer} </h2> <p class="halteomschrijving"> ${lijn.omschrijving}</p></p></div>
                  `
        })
        })

        }

        res.render('berekenhalte', {
            zoekenHaltesDisplay: `${gegevens}`,
        });
    });
});


// de server starten op poort 3000
app.listen(3000);
