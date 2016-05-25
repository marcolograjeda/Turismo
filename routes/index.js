/**
 * Created by Marco on 05/05/2016.
 */
var ruta=require('express').Router();
module.exports = (function (app){
    var departamento = require('../Controller/DepartamentoController')(app);

    ruta.get('/departamento', departamento.list);
    ruta.post('/departamento', departamento.add);
    ruta.put('/departamento', departamento.edit);
    ruta.delete('/departamento', departamento.delete);
    ruta.get('/departamento/:id', departamento.sitiosDepartamento);

    var usuario = require('../Controller/UsuarioController')(app);

    ruta.get('/usuario', usuario.list);
    ruta.post('/usuario', usuario.add);
    ruta.put('/usuario', usuario.edit);
    ruta.delete('/usuario', usuario.delete);

    var comentario = require('../Controller/ComentarioController')(app);

    ruta.get('/comentario', comentario.list);
    ruta.post('/comentario', comentario.add);
    ruta.put('/comentario', comentario.edit);
    ruta.delete('/comentario', comentario.delete);
    ruta.get('/comentario/:id', comentario.listarUno);

    var hotel = require('../Controller/HotelController')(app);

    ruta.get('/hotel', hotel.list);
    ruta.post('/hotel', hotel.add);
    ruta.put('/hotel', hotel.edit);
    ruta.delete('/hotel', hotel.delete);
    ruta.get('/hotel/:id', hotel.listarUno);
    ruta.get('/hotel/:id', hotel.departamentoHotel);

    var sitio = require('../Controller/SitioController')(app);

    ruta.get('/sitio', sitio.list);
    ruta.post('/sitio', sitio.add);
    ruta.put('/sitio', sitio.edit);
    ruta.delete('/sitio', sitio.delete);

    var rol = require('../Controller/RolController')(app);

    ruta.get('/rol', rol.list);
    ruta.post('/rol', rol.add);
    ruta.put('/rol', rol.edit);
    ruta.delete('/rol', rol.delete);
    return ruta;
});