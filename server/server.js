require('./config/config');



const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//middlewars: se disparan cuando se realiza una peticion.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use( require('./routes/usuario.js') );



mongoose.connect(process.env.URLDB,
{
    useNewUrlParser: true, useCreateIndex: true
}, (err, res) => {
    if(err) throw err;
    console.log('Conexion con base de datos establecida!');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});