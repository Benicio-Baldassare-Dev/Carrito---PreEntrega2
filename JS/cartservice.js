function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = ''; // Limpiar la lista de productos
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <p>${product.name} - $${product.price}</p>
                <button onclick="addToCart(${product.id}, 1)">Agregar al Carrito</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}

function renderCart() {
    const cartDiv = document.getElementById('cart');
    if (cartDiv) {
        cartDiv.innerHTML = ''; // Limpiar el carrito
        if (cart.length === 0) {
            cartDiv.innerHTML = '<p>El carrito está vacío</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.innerHTML = `
                    <p>ID: ${item.id}, Nombre: ${item.name}, Cantidad: ${item.quantity}, Precio Total: $${item.totalPrice}</p>
                    <input type="number" min="1" max="${item.quantity}" value="1" id="remove-quantity-${item.id}">
                    <button onclick="removeFromCart(${item.id}, parseInt(document.getElementById('remove-quantity-${item.id}').value))">✖</button>
                `;
                cartDiv.appendChild(cartItemDiv);
            });
        }
    }
}

function createFilterForm() {
    const main = document.querySelector('main');
    const filterForm = document.createElement('form');
    filterForm.id = 'filter-form';

    filterForm.innerHTML = `
        <label for="min-price">Precio Mínimo:</label>
        <input type="number" id="min-price" name="min-price" min="0">

        <label for="max-price">Precio Máximo:</label>
        <input type="number" id="max-price" name="max-price" min="0">

        <button type="submit">Filtrar</button>
    `;

    main.insertBefore(filterForm, document.getElementById('product-list'));

    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || Number.MAX_VALUE;

        const filteredProducts = filterProductsByPrice(minPrice, maxPrice);
        renderProducts(filteredProducts);
    });
}