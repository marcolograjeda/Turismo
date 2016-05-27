/**
 * Created by Marco on 05/05/2016.
 */
var jwt=require('jsonwebtoken');
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
        autenticacion: function (req, res) {
            var Usuario = app.get('usuario');
            Usuario.findAll({
                where:{
                    nick: req.body.nick,
                    contraseña: req.body.contrasena
                }
            }).then(function(usuarios){
                if(usuarios.length>0){
                    res.json(genToken(usuarios[0]))
                }else{
                    res.send({message: "Tu nickname o contraseña no son validos"});
                }
            });
        },
        tokenGenerator:function(req,res){
            var token=jwt.sign({company:'Kinal'},'S3CUR3@APP');
            res.send(token);
        },
        tokenMiddleware:function(req,res,next){
            var token=req.headers['x-access-token'] || req.body.token || req.query.token;
            if(token){
                jwt.verify(token,'S3CUR3@APP',function(err,decoded){
                    if(err){
                        return res.status(403).send({
                            success:false,
                            message:'Fallo al validar token'
                        });
                    }
                    req.user=decoded;
                    next();
                });
            }else{
                return res.status(403).send({
                    success:false,
                    message:'No se proporciono token'
                });
            }
        }
    }
}
function expiresIn(dias){
    var dateObj=new Date();
    return dateObj.setDate(dateObj.getDate()+dias);
}
function genToken(user){
    var payload=jwt.sign({
            "company":"Kinal"
        },
        'S3CUR3@APP');
    var token={
        "token":payload,
        "user": user,
        "exp": expiresIn(1)
    }
    return token;
}