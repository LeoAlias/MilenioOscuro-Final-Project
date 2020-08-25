const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../../db/models');
const { sequelize } = require('../../db/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

controllerIndex = {

  home: function (req, res, next) {

    

    let prodsCategoriaX = products.filter(product => product.category == req.query.categoria)

    let cat = req.query.categoria



    if (req.query.categoria) {

      db.products.findAll({
        limit: 10,
        where: {
          category : req.query.categoria
        }
      }).then(function (products) {
        res.render('index/indexFiltrados', {
          products: products,
          cat,
          usuario: req.session.usuario,
          toThousand
        })
      })

    }


    db.products.findAll()
      .then(function (products) {
        console.log(products)
        res.render('index', {
          products: products,
          usuario: req.session.usuario,
          toThousand

        })

      })


  },


 search : function(req, res){
   db.products.findAll({
     where : {
       name : {[db.Sequelize.Op.substring] : req.query.search}
     }
   })
   .then(function(resultado){
     res.send(resultado)
   })
 },


 emailOfert : function(req, res){

  db.emails.create({
    email : req.body.email
  })

 res.redirect('/')
},










  contact: function (req, res, next) {
    res.render('index/contact', {
      usuario: req.session.usuario
    })
  },
  envios: function (req, res, next) {
    res.render('index/envios', {
      usuario: req.session.usuario
    })
  },
  quienes: function (req, res, next) {
    res.render('index/quienes', {
      usuario: req.session.usuario
    })
  },
  metodopago: function (req, res, next) {
    res.render('index/metodopago', {
      usuario: req.session.usuario
    })
  }

}


module.exports = controllerIndex