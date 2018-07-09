 
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});


app.use(express.static(__dirname + '/public'))
app.get('/', (request, response) => {
    // response.send('<h1>Hello</h1>'); 
    response.render('index.hbs', {
        name: 'Anil',
        likes: [
            'node',
            'django',
            'flask'
        ]
    });
    // response.send({
    //     name: 'Anil',
    //     likes: [
    //         'node',
    //         'django',
    //         'flask'
    //     ]
    // });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page!'
    }
)});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request'
    });
});
app.listen(port, () => {
    console.log(`Server is up and running on ${port}`);
});