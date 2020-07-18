let fs = require('fs');
let {check, validationResult, body} = require ('express-validator');
const { log } = require('console');

userControllers = {

    login: function (req, res, next) {


        res.render('users/login')
    },
    register: function (req, res, next) {


        res.render('users/register')
    },
    create: function (req, res, next) {
        let errors = (validationResult(req));
        console.log(errors);
        if (errors.isEmpty()){
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            let archivoUser = fs.readFileSync('src/data/users.json', {
                encoding: 'utf-8'
            });
            let users;
            if (archivoUser == "") {
                users = [];
            } else {
                users = JSON.parse(archivoUser);
            }

            users.push(user);
            usersJson = JSON.stringify(users);
            fs.writeFileSync('src/data/users.json', usersJson);
            
            res.redirect('/')
        } 
        else {
            return res.render ('users/register', {errors:errors.errors})
        }    
    },
    profile: function (req, res, next) {


        res.render('users/profile')
    }
}
module.exports = userControllers;