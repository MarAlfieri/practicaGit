//Arreglos con datos de productos
const imagen=["masitas.jpg", "yogurt.jpg", "oreo.jpg","yerba.jpg", "leche.jpg", "gaseosa.jpg", "salame.jpg", "jamon.jpg", "arroz.jpg"];
const productos=["Masitas secas 100 gr.", "Yogurt la Serenísima 900 cm3", "Galletitas Oreo 80 gr.", "Yerba Mate Canarias x 1kg","Leche Entera La Serenísima Sachet x 1 Lt.", "Coca-cola Sabor Liviano 2,25 Lt", "Salame tipo Italiano PF 100gr", "Jamón de Cerdo 230 gr.","Arroz Largo Fino Grano Selecto Molinos Ala x 1 Kg"];
const precios=[1110,1300,1550,2000,1800,1400,3500,1000,1800];
const stock=[50,100,200,250,180,140,35,10,80];

let totalCompra=0; //variable para almacenar el total de la compra   
//selecciono input para validar
let entradas = document.querySelectorAll("div input");

//Cargo articulos en la página
function cargarArticulos(){
    let contador=0; //Indice para manejar arreglos predefinidos
    let articulos=document.querySelectorAll("#contproducto p, #contproducto img");
    for (let index = 0; index < articulos.length; index++) {
        articulos[index].src="img/"+imagen[contador];
        articulos[index+1].innerText=productos[contador];
        articulos[index+2].innerText="$ "+precios[contador];
        articulos[index+3].innerText="Stock de: "+stock[contador]+" uds.";
        index+=3;
        contador++;
    }
}

//Función de verificación de stock
function verificarStock(){
    let unidadesCompradas=0; //Variable para determinar que haya unidades compradas
    let stockOk=true; //variable para validar 
    let contador=0; //Indice para manejar arreglos predefinidos
    entradas.forEach(input => {
        let cantidad=Number(parseInt(input.value));
        if(stock[contador]>=cantidad) {
            unidadesCompradas+=Number(input.value);
        } else {
            alert("Stock insuficiente de "+productos[contador]);
            stockOk= false;  //si un valor está por encima de stock                
        }    
        contador++;
    })
    if (unidadesCompradas<=0){
        stockOk= false; //si la cantidad de productos seleccionados es 0
    }
    return stockOk;
}

//Función de compra y resta de stock
function comprar(cantidad,i){
    totalCompra=totalCompra+cantidad*precios[i];
    stock[i]=stock[i]-cantidad;
}

function mostrarCompra(){
    document.getElementById("sumatotal").innerText="TOTAL A PAGAR $ "+totalCompra;
    //Desactivo botón <Guardar Compra>
    document.querySelector("#total").disabled=true;
    document.querySelector("#total").className = "boton desactivar";
    alert("!!Gracias por su compra!!. Total a pagar $ "+totalCompra);
    contador=0;
    let articulos=document.querySelectorAll("#contproducto p, #contproducto img");
    //actualizo vista de stock
    for (let index = 0; index < articulos.length; index++) {
        articulos[index+3].innerText="Stock de: "+stock[contador]+" uds.";
        contador++;
        index+=3; 
    }
}

/*CUERPO PRINCIPAL DEL PROGRAMA*/
//Cargo los elementos de la página con los arreglos de productos.
cargarArticulos();

//Controlo stock y llamo a función compra si esta ok
document.querySelector("#total").addEventListener("click",()=>{
    //Si control de stock es verdadero continúo con la compra
    if (verificarStock()) {
        let contador=0;
        entradas.forEach(input => {
            let cantidad=Number(input.value);
            comprar(cantidad, contador);
            contador++;
        })
        mostrarCompra();
    } else {
        alert("Revise la compra");
        sumar=true;
    }
})

//Botón de nueva compra que limpia contenido y actualiza stock de pantalla
document.querySelector("#borrar").addEventListener("click",()=>{
     //Activo Botón <Guardar Compra>
     document.querySelector("#total").disabled=false;
     document.querySelector("#total").className = "boton";
     totalCompra=0;         
     document.getElementById("sumatotal").innerText="TOTAL A PAGAR $ "+totalCompra;
     document.querySelectorAll("div input").forEach(input => {
        input.value=0;
     })
})