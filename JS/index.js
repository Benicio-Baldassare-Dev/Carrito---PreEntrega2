const products = [
    {id: 1, name: "D.V Catena - Pinot Noir", price: 14500},
    {id: 2, name: "Angelica Zapata - Cabernet Sauvignon", price: 21900},
    {id: 3, name: "El Enemigo - Chardonay", price: 19800},
    {id: 4, name: "D.V Catena - Malbec", price: 980},
    {id: 5, name: "Abito La juventud - Malbec", price: 4600},
    {id: 6, name: "Fond de Cave - Gran Reserva Blend", price: 69500},
];

let cart = loadCartFromLocalStorage();

function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    !product && console.error("Producto no encontrado");

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.totalPrice = cartItem.quantity * product.price;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            totalPrice: quantity * product.price
        });
    }

    saveCartToLocalStorage();
    renderCart(); // Asegúrate de actualizar el carrito cada vez que se agrega un producto
}

function removeFromCart(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    !cartItem && console.error("Producto no encontrado en el carrito");

    if (cartItem.quantity > quantity) {
        cartItem.quantity -= quantity;
        cartItem.totalPrice = cartItem.quantity * cartItem.price;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }

    saveCartToLocalStorage();
    renderCart();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

function filterProductsByPrice(minPrice, maxPrice) {
    return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
}

document.addEventListener('DOMContentLoaded', () => {
    createFilterForm();
    renderProducts();
    renderCart();
});
