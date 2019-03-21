require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middlewars: se disparan cuando se realiza una peticion.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    
    res.json("get usuario");
});

app.post('/usuario', (req, res) => {
    //crear nuevos registros
    let body = req.body;
    if(body.nombre === undefined) {
        res.status(400).json({
            ok: false, 
            mensaje: "El nomnbres un campo obligatorio"
        });
    } else {
        res.status(201).json({
            ok: true,
            mensaje: body
        });
    }

    
});

app.put('/usuario/:id', (req, res) => {
    //actualizar registros
    let id = req.params.id;
    res.json({
        peticion: "put usuario",
        id
    });
});

app.delete('/usuario', (req, res) => {
    //actualizar registros
    res.json("delete usuario");
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});