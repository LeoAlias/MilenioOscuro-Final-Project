


window.addEventListener("load", function(){
  
let stock = document.querySelector("#stock")
let cantidad  = document.querySelector("#qty")
let sumarCarrito = document.querySelector("#sumarCarrito")
let faltaStock = document.querySelector("#faltaStock")
let coloresStock = document.querySelector("#coloresStock")


sumarCarrito.addEventListener("click", function(e){
  if((stock.innerHTML - cantidad.value) <= -1){
    faltaStock.classList.remove("ocultar")
    e.preventDefault()
  }else {
    console.log("estamos bien")
  }
  
})


if(stock.innerHTML > 10){
  coloresStock.style.color = "#17C711 "
}

/* if(stock.innerHTML > 10 && stock.innerHTML < 30){
  coloresStock.style.color = "#E1E710  "
} */

if(stock.innerHTML < 10){
  coloresStock.style.color = "#E1E710   "
}


})