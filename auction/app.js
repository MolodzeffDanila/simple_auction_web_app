const express = require('express');
const app = express();
const port = 3000;
const body_parser = require('body-parser')
const router = require('./router.js')

app.set("view engine", "pug");
app.set("views", "./view");
app.use('/static',express.static(`${__dirname}/static`));
app.use('/jquery',express.static(`${__dirname}/jquery`));

app.use(express.json());
app.use(express.urlencoded());

app.use('/', router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;

