/**
 * Created by Marco on 06/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req, res) {
            var Rol = app.get('rol');
            Rol.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            }).then(function (rol) {
                res.json(rol);
            });
        },
        list:function (req, res) {
            var Rol = app.get('rol');
            Rol.findAll().then(function (rol) {
                res.json(rol);
            })
        },
        edit: function (req, res) {
            var Rol = app.get('rol');
            Rol.findById(req.body.idRol).then(function (rol) {
                if(rol){
                    rol.updateAttributes({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion
                    }).then(function (rol) {
                        res.json(rol);
                    })
                }else {
                    res.status(404).send({message: "Rol no encontrado"});
                }
            });
        },
        delete: function (req, res) {
            var Rol = app.get('rol');
            Rol.destroy({
                where: {
                    idRol: req.body.idRol
                }
            }).then(function (rol) {
                res.json(rol);
            });
        },
        listarUno: function (req, res) {
            var Rol = app.get('rol');
            Rol.find(req.body.idRol).then(function (rol) {
                if(rol){
                    res.json(rol);
                }else {
                    res.status(404).send({message: "Rol no encontrado"});
                }
            });
        }
    }
}