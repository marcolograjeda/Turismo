/**
 * Created by Marco on 05/05/2016.
 */
(function() {
    var express = require('express');
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var mysql = require('mysql');
    var Sequileze = require('sequelize');
    var cors = require('cors');

    var sequileze = new Sequileze('db_AppTurismo', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 30,
            min: 0
        }
    });

    var Rol = sequileze.define('rol', {
        idRol:{type: Sequileze.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequileze.STRING, allowNull: false},
        descripcion: {type: Sequileze.STRING, allowNull: false}
    },{
        freezeTableName: true,
        timeStamp: false
    });

    var Usuario = sequileze.define('usuario', {
        idUsuario: {type: Sequileze.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequileze.STRING, allowNull: false},
        correo: {type: Sequileze.STRING, allowNull: false},
        nick: {type: Sequileze.STRING, allowNull: false},
        contraseña: {type: Sequileze.STRING, allowNull: false},
        telefono: {type: Sequileze.INTEGER, allowNull: false},
        idRol: {type: Sequileze.INTEGER, references: {
            model: Rol,
            key: 'idRol'
        }}
    },{
        freezeTableName: true,
        timeStamp: false
    });

    var Departamento = sequileze.define('departamento', {
        idDepartamento: {type: Sequileze.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequileze.STRING, allowNull: false}
    },{
        freezeTableName: true,
        timeStamp: false
    });

    var Sitio = sequileze.define('sitio', {
        idSitio: {type: Sequileze.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequileze.STRING, allowNull: false},
        informacion: {type: Sequileze.STRING, allowNull: false},
        latitud: {type: Sequileze.STRING, allowNull: false},
        longitud: {type: Sequileze.STRING, allowNull: false}
    },{
        freezeTableName: true,
        timeStamp: false
    });

    var Comentario = sequileze.define('comentario', {
        idComentario: {type: Sequileze.INTEGER, primaryKey: true, autoIncrement: true},
        comentario: {type: Sequileze.STRING, allowNull: false}
    },{
        freezeTableName: true,
        timeStamp: false
    });

    var Hotel = sequileze.define('hotel', {
        idHotel: {type: Sequileze.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Sequileze.STRING, allowNull: false},
        informacion: {type: Sequileze.STRING, allowNull: false}
    },{
        freezeTableName: true,
        timeStamp: false
    });

    Departamento.hasMany(Sitio, {constraints: true});
    Departamento.hasMany(Hotel, {constraints: true});
    Sitio.belongsTo(Departamento, {constraints: true});
    Hotel.belongsTo(Departamento, {constraints: true});
    Sitio.hasMany(Comentario, {constraints: true});
    Comentario.belongsTo(Sitio, {constraints: true});
    Usuario.hasMany(Comentario, {constraints: true});
    Comentario.belongsTo(Usuario, {constraints: true});

    sequileze.sync({force: false});
    var puerto=3000;
    var conf=require('./config');
    var app=express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/api/v1', require('./routes')(app));
    app.use(morgan('dev'));
    app.set('Sequelize',sequileze);
    app.set('departamento', Departamento);
    app.set('usuario', Usuario);
    app.set('comentario', Comentario);
    app.set('hotel', Hotel);
    app.set('sitio', Sitio);
    app.set('rol', Rol);
    app.listen(puerto, function(){
        console.log("Servidor iniciado en el puerto: "+puerto);
    });
})();