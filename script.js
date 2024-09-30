const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const searchBar = document.getElementById('search-bar');
const cartModal = document.getElementById('cart-modal');

let cart = [];
let products = [];

// Fetch products from Fake Store API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    displayProducts(products);
}

// Display products in the product list
function displayProducts(productsToDisplay) {
    productList.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="viewProduct(${product.id})">View Product</button>
        `;
        productList.appendChild(productCard);
    });
}

// View product details
function viewProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'product.html';
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
}

// Add to Cart function
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const title = document.getElementById('product-title').innerText;
    const price = parseFloat(document.getElementById('product-price').innerText.replace('$', ''));
    const quantity = parseInt(document.getElementById('quantity').value);

    const cartItem = {
        title,
        price,
        quantity,
        total: price * quantity
    };

    cart.push(cartItem);
    updateCart();

    // Show notification
    const notification = document.getElementById('notification');
    notification.innerText = "Product is added to cart!";
    notification.style.display = 'block';

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
});

// Update cart count
function updateCartCount() {
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Open cart modal
function openCart() {
    cartModal.style.display = 'block';
    displayCartItems();
}

// Close cart modal
function closeCart() {
    cartModal.style.display = 'none';
}

// Display cart items
function displayCartItems() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <span>${item.title}</span>
            <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    alert(`Total amount: $${total.toFixed(2)}\nThank you for your purchase!`);
    cart = [];
    updateCartCount();
    displayCartItems();
}

// Search functionality
searchBar.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Fetch products on load
fetchProducts();
