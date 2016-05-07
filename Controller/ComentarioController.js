/**
 * Created by Marco on 06/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req, res) {
            var Comentario = app.get('comentario');
            Comentario.create({
                comentario: req.body.comentario,
                sitioIdSitio: req.body.idSitio,
                usuarioIdUsuario: req.body.idUsuario

            }).then(function (comentario) {
                res.json(comentario);
            });
        },
        list:function (req, res) {
            var Comentario = app.get('comentario');
            Comentario.findAll().then(function (comentario) {
                res.json(comentario);
            })
        },
        edit: function (req, res) {
            var Comentario = app.get('comentario');
            Comentario.findById(req.body.idComentario).then(function (comentario) {
                if(comentario){
                    comentario.updateAttributes({
                        comentario: req.body.comentario,
                        sitioIdSitio: req.body.idSitio,
                        usuarioIdUsuario: req.body.idUsuario
                    }).then(function (comentario) {
                        res.json(comentario);
                    })
                }else {
                    res.status(404).send({message: "Comentario no encontrado"});
                }
            });
        },
        delete: function (req, res) {
            var Comentario = app.get('comentario');
            Comentario.destroy({
                where: {
                    idComentario: req.body.idComentario
                }
            }).then(function (comentario) {
                res.json(comentario);
            });
        },
        listarUno: function (req, res) {
            var Comentario = app.get('comentario');
            Comentario.find(req.body.idComentario).then(function (comentario) {
                if(comentario){
                    res.json(comentario);
                }else {
                    res.status(404).send({message: "Comentario no encontrado"});
                }
            });
        }
    }
}