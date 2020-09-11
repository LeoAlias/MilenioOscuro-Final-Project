const db = require('../../db/models')
const { response } = require('express')
var numero = [1]
var precioTotal = []
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

var precioFinal 

var noEliminados = []



let cartControllers = {

   

 home : function(req ,res){

    req.session.cantProdCarro =  noEliminados.length
   

      var totalCarro = noEliminados.reduce(function (acum, precio) {
        return acum + precio.price
      }, 0)

precioFinal = totalCarro



res.render('index/cart', {
    productos: noEliminados,
    usuario: req.session.usuario,
    totalCarrito: totalCarro,
    prodEnCarrito : req.session.cantProdCarro,
    toThousand
  })


    /*  res.send("soy home") */
 },


 store : function(req, res) { 



   

   db.products.findAll({
       where : {
           id : parseInt(req.body.idProducto)
       }
   })
   .then(function(producto){

    for(let negativo of producto){
        var stockEnDb = negativo.stock
    }

    if(stockEnDb >= req.body.qty){
        
    
    

  let prodDuplicados =   noEliminados.find(function(prodDupli){
        return prodDupli.id == req.body.idProducto
    })

    if(prodDuplicados == undefined){

    

 
       for (let prod of producto){

           

        if( prod.offer == "on"){
            var precioVerdadero =   prod.newprice * req.body.qty
      var precioOriginal = prod.newprice
        } else {
            var precioVerdadero =   prod.price * req.body.qty
            var precioOriginal = prod.price
        }
     
       }
    producto.forEach(function(cucu){
        
        
        
        cucu.price = precioVerdadero
        cucu.cantidad = req.body.qty
        cucu.priceOriginal = precioOriginal
        
    })

   


    producto.forEach(function(prod){
      
        noEliminados.push(prod)
    })

  
       
       
       res.redirect("/cart")

    } else {

 let duplicados = noEliminados.findIndex(item => item.id == req.body.idProducto)

 let productoDosVeces = noEliminados[duplicados]

 if(productoDosVeces.stock >= Number(productoDosVeces.cantidad) + (Number(req.body.qty))){

 

   
 productoDosVeces.cantidad = Number(productoDosVeces.cantidad) + (Number(req.body.qty))
 
 if( productoDosVeces.offer == "on"){
    productoDosVeces.price =   productoDosVeces.newprice * productoDosVeces.cantidad
    productoDosVeces.precioOriginal = productoDosVeces.newprice
} else {
    productoDosVeces.price =   productoDosVeces.price * productoDosVeces.cantidad
    productoDosVeces.precioOriginal = productoDosVeces.price
}


    

 res.redirect("/cart")
}else {
    
    
    res.redirect(`localhost:3000/products/detail/${req.body.idProducto}`)
}
    }
  
    
} else {
    
    /* res.render('products/productsDetail') */
    
        res.redirect(`localhost:3000/products/detail/${req.body.idProducto}`)
    }
   })
  
 },


 pay : function(req ,res){

    if( req.session.usuario != undefined){
            
        db.users.findOne({
            where : {
                email : req.session.usuario.email
            }
        })
        .then(function(usuario){
           db.carts.findAll({
               where : {
                   users_id : usuario.id
               }
           })
           .then(function(carrito){
               
               if(carrito == ""){
                db.carts.create({
                    users_id: usuario.id,
                    total: precioFinal
                })
               /*  db.carts.findOne({
                    where : {
                        users_id: usuario.id
                    }
                })
                .then(function(carro){ */
                   /*  console.log("estoy en carro 1 aaaaaaaaaaaaaaaaaaaaaaaa")
                    for (let num of noEliminados){
                        db.products.findByPk(num.id)
                        .then(function(product){
                            carro.addProducts(product)
                        })
                    } */
                    res.redirect("/cart/payment")
                /* }) */


            } else {
                    
                db.carts.findOne({
                    where : {
                        users_id: usuario.id
                    }
                })
                .then(function(carro){
                    
                    for (let num of noEliminados){
                        
                        db.products.findByPk(num.id)                                              
                        .then(function(product){


                            if(product.id == num.id){
                                var laCantidad = num.cantidad
                                var oferta = num.offer
                            }
                            if(product.offer == "on"){
                                precioParadb = product.newprice
                            }else {
                                precioParadb = product.price
                            }
                        
                        carro.addProducts(product, {through : {
                                 offer : oferta,
                                price: precioParadb,
                                qty : laCantidad
                            }})
                        })

                        db.products.update({
                            stock : (num.stock - num.cantidad)
                        }, {
                            where : {
                                id : num.id

                            }
                        })

                    }
                    res.render('index/pagoExitoso')
                })
            }


        })
    })
   
  } else {
      res.redirect("/users/login")
  }
},



 delete : function(req, res){

    if( req.session.usuario != undefined){

        db.users.findOne({
            where : {
                email : req.session.usuario.email
            }
        }) 
        .then(function(usuario){

        db.carts.findOne({
            where : {
                users_id: usuario.id
            }
        })
        .then(function(carro){
            carro.removeProducts(req.params.id)
            res.redirect("/cart")
        })
    })

   

   let alFin = noEliminados.filter(function(prod){
        return prod.id != req.params.id
    })

    noEliminados = alFin

    
     res.redirect("/cart")

} else {
    let alFin = noEliminados.filter(function(prod){
        return prod.id != req.params.id
    })

    noEliminados = alFin

    
     res.redirect("/cart")
}

 },


 successfull : function(req, res){
   
    db.users.findOne({
        where : {
            email : req.session.usuario.email
        }
    }) 
    .then(function(usuario){
       
        db.carts.destroy({
            where : {
                users_id : usuario.id
            }
        })

        noEliminados = []
        req.session.cantProdCarro =  ""
        

        res.redirect('/')
    })

     
 }

























}



module.exports = cartControllers