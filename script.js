// Carrito de compras

const carrito = [];

class Producto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

function agregar(){
    let nombre = prompt("ingrese el nombre del producto");
    let precio = prompt("Ingrese el precio del producto");

    if(nombre && !isNaN(precio)){
        let producto = new Producto(nombre, precio);
        carrito.push(producto);
        console.log(`Se agrego el producto: ${nombre}, con un precio de: ${precio}, al carrito`);
        document.getElementById('cantidad').value = carrito.length;
    }else{
        console.log("Datos invalidos, intentelo de nuevo!");
    }
}

function buscar(){
    let buscarNombre = prompt("Ingrse el nombre del producto a buscar");
    let productoEncontrado = carrito.find(producto => producto.nombre.toLowerCase() === buscarNombre.toLowerCase());

    if(productoEncontrado){
        console.log(`Se encontro el producto: ${productoEncontrado.nombre}, con un precio de: ${productoEncontrado.precio} en el carrito`)
    } else {
        console.log("No se encontro ningun producto");
    }
}

function filtrar() {
    let precioMaximo = parseFloat(prompt("Ingrese el precio máximo para filtrar los productos:"));

    if (!isNaN(precioMaximo)) {
        let productosFiltrados = carrito.filter(producto => producto.precio <= precioMaximo);

        if (productosFiltrados.length > 0) {
            console.log("Productos filtrados:");
            productosFiltrados.forEach(producto => {
                console.log(`Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
            });
        } else {
            console.log("No se encontraron productos con un precio menor o igual al especificado.");
        }
    } else {
        console.log("Precio inválido. Inténtelo de nuevo.");
    }
}
