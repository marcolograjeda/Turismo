/**
 * Created by Marco on 05/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.create({
                nombre: req.body.nombre
            }).then(function (departamento) {
                res.json(departamento);
            });
        },
        list:function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.findAll().then(function (departamento) {
                res.json(departamento);
            })
        },
        edit: function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.findById(req.body.idDepartamento).then(function (departamento) {
                if(departamento){
                    departamento.updateAttributes({
                        nombre: req.body.nombre
                    }).then(function (departamento) {
                        res.json(departamento);
                    })
                }else {
                    res.status(404).send({message: "Departamento no encontrado"});
                }
            });
        },
        delete: function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.destroy({
                where: {
                    idDepartamento: req.body.idDepartamento
                }
            }).then(function (departamento) {
                res.json(departamento);
            });
        },
        listarUno: function (req, res) {
            var Departamento = app.get('departamento');
            Departamento.find(req.body.idDepartamento).then(function (departamento) {
                if(departamento){
                    res.json(departamento);
                }else {
                    res.status(404).send({message: "Departamento no encontrado"});
                }
            });
        },
        sitiosDepartamento: function (req, res) {
            var Departamento = app.get('departamento');
            var Sitio = app.get('sitio');
            Departamento.find({where: {idDepartamento: req.params.id}, include:[Sitio]}).then(function (departamento) {
                res.json(departamento);
            });
        }
    }
}