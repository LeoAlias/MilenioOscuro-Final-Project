const archivoUsuario = require('../data/users.json')
/* const db = require('../../db/models') */


module.exports = function  (req, res, next) {


    if (req.cookies.recordame != undefined && req.session.usuario == undefined) {

        let usuarioEncontrado = archivoUsuario.find(usuario => {
            return usuario.email == req.cookies.recordame
        })
        if (usuarioEncontrado) {
    
            req.session.usuario = usuarioEncontrado
            
            }
            
    }
    next()
}


/* if (req.cookies.recordame != undefined && req.session.usuario == undefined) {

    let usuarioEncontrado = db.users.findOne({
        where: {
            email: req.cookies.recordame,
        }
    }
    )
    if (usuarioEncontrado) {

        req.session.usuario = usuarioEncontrado
        
        }
        
}
next()
} */