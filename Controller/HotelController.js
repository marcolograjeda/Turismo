/**
 * Created by Marco on 06/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req, res) {
            var Hotel = app.get('hotel');
            Hotel.create({
                nombre: req.body.nombre,
                informacion: req.body.informacion,
                departamentoIdDepartamento: req.body.idDepartamento
            }).then(function (hotel) {
                res.json(hotel);
            });
        },
        list:function (req, res) {
            var Hotel = app.get('hotel');
            Hotel.findAll().then(function (hotel) {
                res.json(hotel);
            })
        },
        edit: function (req, res) {
            var Hotel = app.get('hotel');
            Hotel.findById(req.body.idHotel).then(function (hotel) {
                if(hotel){
                    hotel.updateAttributes({
                        nombre: req.body.nombre,
                        informacion: req.body.informacion,
                        departamentoIdDepartamento: req.body.idDepartamento
                    }).then(function (hotel) {
                        res.json(hotel);
                    })
                }else {
                    res.status(404).send({message: "Hotel no encontrado"});
                }
            });
        },
        delete: function (req, res) {
            var Hotel = app.get('hotel');
            Hotel.destroy({
                where: {
                    idHotel: req.body.idHotel
                }
            }).then(function (hotel) {
                res.json(hotel);
            });
        },
        listarUno: function (req, res) {
            var Hotel = app.get('hotel');
            Hotel.find(req.body.idHotel).then(function (hotel) {
                if(hotel){
                    res.json(hotel);
                }else {
                    res.status(404).send({message: "Hotel no encontrado"});
                }
            });
        },
        departamentoHotel: function (req, res) {
            var Hotel = app.get('hotel');
            var Departamento = app.get('departamento');
            Hotel.find({where: {idHotel: req.params.id}, include:[Departamento]}).then(function (hotel) {
                res.json(hotel);
            });
        }
    }
}