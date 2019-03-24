const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();



app.get('/usuario', (req, res) => {
   let desde = req.query.desde || 0;
   let limite = req.query.limite || 5; 
    Usuario.find({estado: true}, 'nombre email role estado google img')
            .skip(Number(desde))
            .limit(Number(limite))
            .exec((err, usuarios) => {
                if(err) {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }
                Usuario.count({}, (err, conteo) => {
                    if(err) {
                        res.status(400).json({
                            ok: false,
                            err
                        });
                    }

                    res.status(200).json({
                        ok: true,
                        conteo, 
                        usuarios
                    });
                });
                
            });
});

app.post('/usuario', (req, res) => {
    //crear nuevos registros
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });  
    
    usuario.save((err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;
        
        res.status(200).json({
            ok: true, 
            usuario: usuarioDB
        });
    });

    
});

app.put('/usuario/:id', (req, res) => {
    //actualizar registros
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    
    /*let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        role: body.role
    }); */ 

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
        
    });
    
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, {estado: false}, (err, updatedUser) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(updatedUser === null) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no entontrado'
            });
        }

        res.status(200).json({
            ok: true, 
            usuario: updatedUser
        });
    });
    
});
/*app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});*/


module.exports = app;
