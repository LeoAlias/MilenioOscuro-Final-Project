module.exports = function(sequelize , dataTypes){


let alias = "products"

let cols = {

    id : {
        type : dataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    name : {
        type : dataTypes.STRING
    },

    price : {

        type : dataTypes.INTEGER
    },

    description : {
        type : dataTypes.STRING
    },
   
    image : {
         type : dataTypes.STRING
    },

    imagetwo : {
            
        type : dataTypes.STRING
    },

    category : {
        type : dataTypes.STRING
   },

   offer : {
       type : dataTypes.STRING
   },
   newprice : {
       type : dataTypes.INTEGER
   },
   stock : {
       type : dataTypes.INTEGER
   }


}

let config = {
    tableName : "products",
    timestamps : true,
    underscor : true,
    createdAt : "created_at",
    updatedAt : "updated_at",
    deletedAt : "deleted_at",
    paranoid : true
}








  let product = sequelize.define(alias, cols, config)


  product.associate = function(models){
      product.belongsToMany(models.carts , {
          as : "carts",
          through: models.cartsProducts,
          foreignKey : "product_id",
          otherKey : "cart_id",
          timestamps: true
      })
  }



  return product



}