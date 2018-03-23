const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

//Resuable chunks of html that can have data injected into them.
hbs.registerPartials(__dirname + '/views/partials')

//setting view engine
app.set('view engine', 'hbs'); //sets view engine to handlebars

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to log to server.log!');
    }
  });
  next(); //tells express when middleware is done
});

//maintenance middleware
/*
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

//HandleBar Helpers , function that can be called to pass data
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/help', (req, res) => {
  res.render('help.html', {
    pageTitle:'Help Page',
    currentYear: new Date().getFullYear()
  });
});


app.get('/bad', (req,res) => {
  res.send({
    errorMessage: "failed to load / bad url!"
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
}); //change for production
