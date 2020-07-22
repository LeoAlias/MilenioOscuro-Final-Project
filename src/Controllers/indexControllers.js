const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


controllerIndex = {

  home: function (req, res, next) {

    let prodsCategoriaX = products.filter (product => product.category == req.query.categoria)

    let cat = req.query.categoria


    if (req.query.categoria){

      res.render('index/indexFiltrados', {
    prodsCategoriaX, cat, usuario : req.session.usuario})
  }

    res.render('index', {
      products: products, usuario : req.session.usuario
    })
  },


  cart: function (req, res, next) {
    res.render('index/cart' , {usuario : req.session.usuario})
  }

}


module.exports = controllerIndex