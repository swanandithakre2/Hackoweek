const products = [
    {
        id: 1,
        name: "UltraBook Pro 15",
        description: "Powerful laptop with 16GB RAM and 512GB SSD",
        price: 89990,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "SmartPhone X12",
        description: "6.7-inch display with 128GB storage",
        price: 45990,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        badge: "New"
    },
    {
        id: 3,
        name: "Wireless Earbuds ANC",
        description: "Active noise cancellation with 30-hour battery",
        price: 8990,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 4,
        name: "Gaming Laptop Titan",
        description: "RTX 4060, 32GB RAM, 1TB SSD",
        price: 149990,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
        badge: "Sale"
    },
    {
        id: 5,
        name: "Smart Watch Ultra",
        description: "Health tracking, GPS, water resistant",
        price: 12990,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 6,
        name: "Circuit Board Kit",
        description: "DIY electronics learning kit with 50 components",
        price: 2490,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 7,
        name: "Desktop PC Build",
        description: "Intel i7, 16GB RAM, 1TB NVMe SSD",
        price: 79990,
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
        badge: "Popular"
    },
    {
        id: 8,
        name: "Tablet Pro 11",
        description: "128GB storage with stylus support",
        price: 35990,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
        badge: null
    }
];

let cart = [];

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    
    const btn = event.target.closest('.add-to-cart-btn');
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    }, 1500);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-icon">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = '₹' + total.toLocaleString('en-IN');
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('show');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase! Your order has been placed.');
    cart = [];
    updateCartUI();
    toggleCart();
}

document.addEventListener('DOMContentLoaded', renderProducts);
