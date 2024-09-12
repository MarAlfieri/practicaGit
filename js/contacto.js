//Creo un arreglo con los elementos button
let entradas = document.querySelectorAll("input,textarea");
//Arreglo para almacenar los "Value" de los "input"
let contacto = [];
//Verifico los click del boton
document.getElementById("enviar").addEventListener("click", (e) => {
    //Si no se cumplen con las condiciones de validación, no crea el archivo
    if (document.querySelector("form").reportValidity()){
        //Creo el archivo de texto con los datos del form
        for (let index = 0; index < entradas.length; index++) {
            contacto[index] =" "+entradas[index].value;
        }
        //Se crea el archivo de texto
        let mensaje = new Blob([contacto], {type: "text/plain;charset=utf-8"}); // navegador
        //Libreria FileSaver.js
        saveAs(mensaje, "contacto.txt");
        alert("Gracias por su mensaje!!. A la brevedad nos pondremos en contacto.")
    }
})



