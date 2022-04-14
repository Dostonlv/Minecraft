import express = require('express');

const app= express();


app.set('view engine', 'pug');
app.set('views', './');

app.use('/texture', express.static(__dirname + '/texture'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/style', express.static(__dirname + '/style'));

app.get("/", (req:any, res:any) => {
  res.render('index.pug');
})

app.listen(3000, () => console.log('Server running'));
