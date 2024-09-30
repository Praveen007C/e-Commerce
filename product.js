document.addEventListener('DOMContentLoaded', async () => {
    const productId = localStorage.getItem('selectedProduct');
    if (productId) {
        const response = await fetch('https://fakestoreapi.com/products/' + productId);
        const product = await response.json();
        displayProduct(product);
    } else {
        window.location.href = 'index.html'; // Redirect if no product selected
    }
});

function displayProduct(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <div class="product-detail-card">
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="goBack()">Back to Products</button>
        </div>
    `;
}

function goBack() {
    window.location.href = 'index.html';
}
