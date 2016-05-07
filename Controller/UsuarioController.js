/**
 * Created by Marco on 05/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.create({
                nombre: req.body.nombre,
                correo: req.body.correo,
                nick: req.body.nick,
                contraseña: req.body.contraseña,
                telefono: req.body.telefono,
                idRol: 1
            }).then(function (usuario) {
                res.json(usuario);
            });
        },
        list:function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.findAll().then(function (usuario) {
                res.json(usuario);
            })
        },
        edit: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.findById(req.body.idUsuario).then(function (usuario) {
                if(usuario){
                    usuario.updateAttributes({
                        nombre: req.body.nombre,
                        correo: req.body.correo,
                        nick: req.body.nick,
                        contraseña: req.body.contraseña,
                        telefono: req.body.telefono
                    }).then(function (usuario) {
                        res.json(usuario);
                    })
                }else {
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            });
        },
        delete: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.destroy({
                where: {
                    idUsuario: req.body.idUsuario
                }
            }).then(function (usuario) {
                res.json(usuario);
            });
        },
        listarUno: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.find(req.body.idUsuario).then(function (usuario) {
                if(usuario){
                    res.json(usuario);
                }else {
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            });
        },
        autenticacion: function () {
            var Usuario = app.get('usuario');
            Usuario.findAll({
                where:{
                nick: req.body.nick,
                contraseña: req.body.contraseña
                }
            }).then(function(usuarios){
               res.json(usuarios[0]);
            });
        }
    }
}