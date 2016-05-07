/**
 * Created by Marco on 06/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req, res) {
            var Sitio = app.get('sitio');
            Sitio.create({
                nombre: req.body.nombre,
                informacion: req.body.informacion,
                latitud: req.body.latitud,
                longitud: req.body.longitud,
                departamentoIdDepartamento: req.body.idDepartamento
            }).then(function (sitio) {
                res.json(sitio);
            });
        },
        list:function (req, res) {
            var Sitio = app.get('sitio');
            Sitio.findAll().then(function (sitio) {
                res.json(sitio);
            })
        },
        edit: function (req, res) {
            var Sitio = app.get('sitio');
            Sitio.findById(req.body.idSitio).then(function (sitio) {
                if(sitio){
                    sitio.updateAttributes({
                        nombre: req.body.nombre,
                        informacion: req.body.informacion,
                        latitud: req.body.latitud,
                        longitud: req.body.longitud,
                        departamentoIdDepartamento: req.body.idSitio
                    }).then(function (sitio) {
                        res.json(sitio);
                    })
                }else {
                    res.status(404).send({message: "Sitio no encontrado"});
                }
            });
        },
        delete: function (req, res) {
            var Sitio = app.get('sitio');
            Sitio.destroy({
                where: {
                    idSitio: req.body.idSitio
                }
            }).then(function (sitio) {
                res.json(sitio);
            });
        },
        listarUno: function (req, res) {
            var Sitio = app.get('sitio');
            Sitio.find(req.body.idSitio).then(function (sitio) {
                if(sitio){
                    res.json(sitio);
                }else {
                    res.status(404).send({message: "Sitio no encontrado"});
                }
            });
        },
        departamentoSitio: function (req, res) {
            var Sitio = app.get('Sitio');
            var Departamento = app.get('departamento');
            Sitio.find({where: {idSitio: req.params.id}, include:[Departamento]}).then(function (sitio) {
                res.json(sitio);
            });
        }
    }
}