// Linked List Node Class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Shopping Cart as Linked List
class ShoppingCart {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add to tail (default)
    addToTail(item) {
        const newNode = new Node(item);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
        return true;
    }

    // Add to head
    addToHead(item) {
        const newNode = new Node(item);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
        return true;
    }

    // Remove by ID
    removeById(id) {
        if (!this.head) return null;
        
        if (this.head.data.id === id) {
            const removed = this.head;
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.size--;
            return removed.data;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.data.id === id) {
                const removed = current.next;
                current.next = current.next.next;
                if (current.next === null) this.tail = current;
                this.size--;
                return removed.data;
            }
            current = current.next;
        }
        return null;
    }

    // Display all items
    display() {
        const items = [];
        let current = this.head;
        while (current) {
            items.push(current.data);
            current = current.next;
        }
        return items;
    }

    // Get size
    getSize() {
        return this.size;
    }

    // Calculate total
    getTotal() {
        let total = 0;
        let current = this.head;
        while (current) {
            total += current.data.price * current.data.quantity;
            current = current.next;
        }
        return total;
    }

    // Clear cart
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}

// Product Data with Real Images
const products = [
    { 
        id: 1, 
        name: "Wireless Earbuds Pro", 
        desc: "Active noise cancellation", 
        price: 8990, 
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
        badge: "Best Seller" 
    },
    { 
        id: 2, 
        name: "Smart Watch Ultra", 
        desc: "Health & fitness tracking", 
        price: 15990, 
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        badge: "New" 
    },
    { 
        id: 3, 
        name: "Gaming Mouse RGB", 
        desc: "16000 DPI precision", 
        price: 2490, 
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
        badge: null 
    },
    { 
        id: 4, 
        name: "Portable Charger 20000mAh", 
        desc: "Fast charging support", 
        price: 1990, 
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
        badge: "Sale" 
    },
    { 
        id: 5, 
        name: "Mechanical Keyboard", 
        desc: "RGB backlit switches", 
        price: 4990, 
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        badge: null 
    },
    { 
        id: 6, 
        name: "USB-C Hub 7-in-1", 
        desc: "All ports in one", 
        price: 2990, 
        image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=300&fit=crop",
        badge: null 
    },
    { 
        id: 7, 
        name: "Webcam 4K Pro", 
        desc: "Auto-focus & HDR", 
        price: 7990, 
        image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop",
        badge: "Popular" 
    },
    { 
        id: 8, 
        name: "Laptop Stand", 
        desc: "Ergonomic aluminum", 
        price: 1490, 
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        badge: null 
    }
];

// Initialize cart
const cart = new ShoppingCart();

// Render Products with Images
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
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart (linked list)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
    };

    cart.addToTail(cartItem);
    updateUI();
    showMessage(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(id) {
    const removed = cart.removeById(id);
    if (removed) {
        updateUI();
        showMessage(`${removed.name} removed from cart`);
    }
}

// Update UI
function updateUI() {
    document.getElementById('cartCount').textContent = cart.getSize();
    
    const cartItems = document.getElementById('cartItems');
    const items = cart.display();
    
    if (items.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = items.map(item => `
            <div class="cart-item">
                <div class="cart-item-icon">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    document.getElementById('cartTotal').textContent = '₹' + cart.getTotal().toLocaleString('en-IN');
    
    updateLinkedListVisual();
}

// Update Linked List Visual
function updateLinkedListVisual() {
    const visual = document.getElementById('linkedListVisual');
    const items = cart.display();
    
    if (items.length === 0) {
        visual.innerHTML = '<p class="empty-cart-msg">Cart is empty</p>';
        return;
    }

    let html = '<span class="ll-head">HEAD</span><span class="ll-arrow">→</span>';
    
    items.forEach((item, index) => {
        html += `<div class="ll-node">`;
        html += `<span class="ll-item">${item.name.substring(0, 6)}</span>`;
        if (index < items.length - 1) {
            html += `<span class="ll-arrow">→</span>`;
        }
        html += `</div>`;
    });
    
    html += `<span class="ll-arrow">→</span><span class="ll-tail">NULL</span>`;
    visual.innerHTML = html;
}

// Toggle Cart
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('show');
}

// Show Message
function showMessage(text) {
    const toast = document.getElementById('messageToast');
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Checkout
function checkout() {
    if (cart.getSize() === 0) {
        showMessage('Cart is empty!');
        return;
    }
    const total = cart.getTotal();
    cart.clear();
    updateUI();
    toggleCart();
    showMessage(`Order placed! Total: ₹${total.toLocaleString('en-IN')}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', renderProducts);
