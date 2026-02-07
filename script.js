/* ========================================
   OSCAR IRON - E-COMMERCE FUNCTIONALITY
   ======================================== */

// ========== PRODUCT DATABASE ==========
const products = {
    supplements: [
        {
            id: 'sup-001',
            name: 'Whey Protein Powder',
            price: 49.99,
            category: 'protein',
            emoji: '🥤',
            description: 'Premium whey protein with 25g of protein per serving',
            options: {
                flavor: ['Vanilla', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
                size: ['1lb', '2lbs', '5lbs']
            }
        },
        {
            id: 'sup-002',
            name: 'Creatine Monohydrate',
            price: 29.99,
            category: 'creatine',
            emoji: '💊',
            description: 'Pure creatine monohydrate for muscle strength and performance',
            options: {
                size: ['100g', '250g', '500g'],
                type: ['Powder', 'Capsules']
            }
        },
        {
            id: 'sup-003',
            name: 'Mass Gainer Pro',
            price: 59.99,
            category: 'gainer',
            emoji: '🍖',
            description: 'High-calorie mass gainer with 50g of carbs and 20g protein',
            options: {
                flavor: ['Banana', 'Chocolate', 'Vanilla'],
                size: ['3lbs', '6lbs']
            }
        },
        {
            id: 'sup-004',
            name: 'Pre-Workout Explosion',
            price: 39.99,
            category: 'preworkout',
            emoji: '⚡',
            description: 'Explosive pre-workout with beta-alanine and caffeine',
            options: {
                flavor: ['Green Apple', 'Blue Raspberry', 'Tropical Punch'],
                size: ['200g', '400g']
            }
        },
        {
            id: 'sup-005',
            name: 'Casein Protein Night',
            price: 44.99,
            category: 'protein',
            emoji: '🥛',
            description: 'Slow-release casein for overnight muscle recovery',
            options: {
                flavor: ['Vanilla', 'Chocolate', 'Peanut Butter'],
                size: ['1.5lbs', '3lbs']
            }
        },
        {
            id: 'sup-006',
            name: 'Caffeine Pills',
            price: 14.99,
            category: 'preworkout',
            emoji: '☕',
            description: '200mg pure caffeine capsules for quick energy',
            options: {
                quantity: ['30 pills', '60 pills', '120 pills']
            }
        }
    ],
    equipment: [
        {
            id: 'eq-001',
            name: 'Leather Weight Lifting Gloves',
            price: 34.99,
            category: 'gloves',
            emoji: '🧤',
            description: 'Premium leather gloves with wrist support',
            options: {
                size: ['S', 'M', 'L', 'XL'],
                color: ['Black', 'Red', 'Blue']
            }
        },
        {
            id: 'eq-002',
            name: 'Weightlifting Belt Pro',
            price: 79.99,
            category: 'belts',
            emoji: '🤐',
            description: 'Heavy-duty leather belt with reinforced buckle',
            options: {
                size: ['S', 'M', 'L', 'XL'],
                width: ['3 inch', '4 inch']
            }
        },
        {
            id: 'eq-003',
            name: 'Performance Gym Shorts',
            price: 44.99,
            category: 'shorts',
            emoji: '🩳',
            description: 'Breathable shorts with deep pockets',
            options: {
                size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                color: ['Black', 'Gray', 'Red']
            }
        },
        {
            id: 'eq-004',
            name: 'Dri-Fit Gym Shirt',
            price: 39.99,
            category: 'shirts',
            emoji: '👕',
            description: 'Moisture-wicking athletic shirt',
            options: {
                size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                color: ['Black', 'White', 'Red', 'Navy']
            }
        },
        {
            id: 'eq-005',
            name: 'Tactical Wrist Wraps',
            price: 24.99,
            category: 'gloves',
            emoji: '🏷️',
            description: 'Elastic wrist wraps for extra support',
            options: {
                length: ['12 inch', '18 inch'],
                color: ['Black', 'Red']
            }
        },
        {
            id: 'eq-006',
            name: 'Powerlifting Belt',
            price: 69.99,
            category: 'belts',
            emoji: '⚙️',
            description: 'Competition-grade powerlifting belt',
            options: {
                size: ['M', 'L', 'XL'],
                type: ['Single Prong', 'Lever']
            }
        }
    ]
};

// ========== SHOPPING CART STATE ==========
let cart = [];

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    initializeEventListeners();
    renderHomePage();
    updateCartCount();
});

// ========== LOCAL STORAGE FUNCTIONS ==========
/**
 * Save cart to browser's local storage
 */
function saveCartToStorage() {
    localStorage.setItem('oscarIronCart', JSON.stringify(cart));
}

/**
 * Load cart from browser's local storage
 */
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('oscarIronCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

/**
 * Simple floating notification helper
 */
function showNotification(message, timeout = 3000) {
    const notif = document.createElement('div');
    notif.className = 'oscar-notification';
    notif.textContent = message;
    Object.assign(notif.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#111',
        color: '#fff',
        padding: '10px 16px',
        borderRadius: '6px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 9999,
        opacity: '0',
        transition: 'opacity 200ms ease'
    });

    document.body.appendChild(notif);
    // trigger transition
    requestAnimationFrame(() => notif.style.opacity = '1');
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 250);
    }, timeout);
}

// ========== INITIALIZATION FUNCTIONS ==========
/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Navigation links
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
        });
    });

    // Modal close button
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterProducts(e.target.dataset.filter);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thanks for subscribing! Check your email for updates.');
            newsletterForm.reset();
        });
    }
}

/**
 * Render the home page with featured products
 */
function renderHomePage() {
    const grid = document.getElementById('featuredProductsGrid');
    const featured = [...products.supplements, ...products.equipment].slice(0, 4);
    grid.innerHTML = featured.map(product => createProductCard(product, true)).join('');
}

// ========== NAVIGATION FUNCTIONS ==========
/**
 * Navigate to a specific page/section
 */
function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Render page content
    if (pageId === 'supplements') {
        renderProducts(products.supplements, 'supplementsGrid');
    } else if (pageId === 'equipment') {
        renderProducts(products.equipment, 'equipmentGrid');
    } else if (pageId === 'cart') {
        renderCart();
    }
}

// ========== PRODUCT RENDERING FUNCTIONS ==========
/**
 * Create a product card HTML element
 */
function createProductCard(product, isFeatured = false) {
    return `
        <div class="product-card" onclick="openProductModal('${product.id}', '${product.category === 'protein' || product.category === 'creatine' || product.category === 'gainer' || product.category === 'preworkout' ? 'supplements' : 'equipment'}')">
            <div class="product-image">${product.emoji}</div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                ${!isFeatured ? `
                    <div class="product-options">
                        ${createProductOptions(product)}
                    </div>
                ` : ''}
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}', '${product.category === 'protein' || product.category === 'creatine' || product.category === 'gainer' || product.category === 'preworkout' ? 'supplements' : 'equipment'}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

/**
 * Create product option selectors
 */
function createProductOptions(product) {
    const optionCategories = Object.keys(product.options);
    return optionCategories.map((optionType, index) => {
        if (index > 0) return ''; // Only show first option in card
        return `
            <select id="option-${product.id}-${optionType}" class="product-option">
                <option value="">Select ${optionType}</option>
                ${product.options[optionType].map(opt => 
                    `<option value="${opt}">${opt}</option>`
                ).join('')}
            </select>
        `;
    }).join('');
}

/**
 * Render all products to a grid
 */
function renderProducts(productList, gridId) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = productList.map(product => createProductCard(product)).join('');
}

/**
 * Filter products by category
 */
function filterProducts(filter) {
    let filtered;
    const currentPage = document.querySelector('.page.active').id;

    if (currentPage === 'supplements') {
        filtered = filter === 'all' ? products.supplements : products.supplements.filter(p => p.category === filter);
        renderProducts(filtered, 'supplementsGrid');
    } else if (currentPage === 'equipment') {
        filtered = filter === 'all' ? products.equipment : products.equipment.filter(p => p.category === filter);
        renderProducts(filtered, 'equipmentGrid');
    }
}

// ========== MODAL FUNCTIONS ==========
/**
 * Open product detail modal
 */
function openProductModal(productId, type) {
    const productList = type === 'supplements' ? products.supplements : products.equipment;
    const product = productList.find(p => p.id === productId);

    if (!product) return;

    const modalBody = document.getElementById('modalBody');
    const optionsHtml = Object.entries(product.options).map(([optionType, optionValues]) => `
        <div class="product-options">
            <label for="modal-${product.id}-${optionType}">${optionType.charAt(0).toUpperCase() + optionType.slice(1)}:</label>
            <select id="modal-${product.id}-${optionType}" class="product-option">
                <option value="">Select ${optionType}</option>
                ${optionValues.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
        </div>
    `).join('');

    modalBody.innerHTML = `
        <h2>${product.name}</h2>
        <div class="modal-image">${product.emoji}</div>
        <div class="product-category">${product.category}</div>
        <p>${product.description}</p>
        <div class="modal-price">$${product.price.toFixed(2)}</div>
        ${optionsHtml}
        <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;" onclick="addToCart('${product.id}', '${type}'); document.getElementById('productModal').classList.remove('active');">
            Add to Cart
        </button>
    `;

    document.getElementById('productModal').classList.add('active');
}

// ========== SHOPPING CART FUNCTIONS ==========
/**
 * Add product to shopping cart
 */
function addToCart(productId, type) {
    const productList = type === 'supplements' ? products.supplements : products.equipment;
    const product = productList.find(p => p.id === productId);

    if (!product) return;

    // Get selected options
    const options = {};
    Object.keys(product.options).forEach(optionType => {
        const selectId = document.getElementById(`modal-${productId}-${optionType}`) || 
                        document.getElementById(`option-${productId}-${optionType}`);
        if (selectId) {
            const value = selectId.value;
            if (value) {
                options[optionType] = value;
            }
        }
    });

    // Check if item with same options already exists
    const existingItem = cart.find(item =>
        item.id === productId &&
        JSON.stringify(item.options) === JSON.stringify(options)
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            category: product.category,
            options: options,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

/**
 * Remove item from cart
 */
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartCount();
    renderCart();
}

/**
 * Update item quantity
 */
function updateQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
        saveCartToStorage();
        renderCart();
    }
}

/**
 * Update cart count in navbar
 */
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

/**
 * Render shopping cart page
 */
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="navigateTo('home')">Continue Shopping</button>
            </div>
        `;
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('shipping').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="product-category">${item.category}</p>
                ${Object.entries(item.options).map(([key, value]) =>
                    `<p><small>${key}: ${value}</small></p>`
                ).join('')}
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
    `).join('');

    updateCartTotals();
}

/**
 * Calculate and display cart totals
 */
function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('shipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// ========== CHECKOUT FUNCTIONS ==========
/**
 * Handle checkout process
 */
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty. Add items before checkout!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total > 100 ? 0 : 10;
    const finalTotal = total + shipping;

    // Create checkout modal
    const checkoutModal = document.createElement('div');
    checkoutModal.id = 'checkoutModal';
    checkoutModal.className = 'modal active';
    checkoutModal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <span class="close" onclick="document.getElementById('checkoutModal').remove()">&times;</span>
            <div class="checkout-form">
                <h2>Checkout</h2>
                <div class="checkout-section">
                    <h3>Shipping Information</h3>
                    <form id="shippingForm">
                        <div class="form-group">
                            <label for="fullName">Full Name *</label>
                            <input type="text" id="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="address">Address *</label>
                            <input type="text" id="address" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="city">City *</label>
                                <input type="text" id="city" required>
                            </div>
                            <div class="form-group">
                                <label for="zip">ZIP Code *</label>
                                <input type="text" id="zip" required>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="checkout-section">
                    <h3>Payment Information</h3>
                    <form id="paymentForm">
                        <div class="form-group">
                            <label for="cardName">Cardholder Name *</label>
                            <input type="text" id="cardName" required>
                        </div>

                        <div class="form-group">
                            <label for="cardNumber">Card Number *</label>
                            <input type="text" id="cardNumber" required placeholder="1234 5678 9012 3456">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="exp">Expiry *</label>
                                <input type="text" id="exp" required placeholder="MM/YY">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV *</label>
                                <input type="text" id="cvv" required placeholder="123">
                            </div>
                        </div>

                        <div class="checkout-summary" style="margin-top:1rem;">
                            <div class="summary-row">
                                <span>Order Total:</span>
                                <strong>$${finalTotal.toFixed(2)}</strong>
                            </div>
                            <button id="confirmOrderBtn" class="btn btn-primary" style="width:100%; margin-top:1rem;">Place Order</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(checkoutModal);

    // Wire up confirm order button
    const confirmBtn = document.getElementById('confirmOrderBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const shippingForm = document.getElementById('shippingForm');
            const paymentForm = document.getElementById('paymentForm');
            if (!shippingForm.checkValidity() || !paymentForm.checkValidity()) {
                showNotification('Please complete all required fields.');
                return;
            }

            // Simulate successful checkout
            showNotification('Order placed successfully! Thank you for your purchase.');
            cart = [];
            saveCartToStorage();
            updateCartCount();
            renderCart();
            checkoutModal.remove();
        });
    }

}
// ===============================
// API: Load products from internet
// ===============================

// New code: Fetch products from a public API and update the
// element with id="api-status" with a simple success/failure message.
// These comments explain only the new code below.
fetch('https://fakestoreapi.com/products')
    .then(response => {
        // Check for HTTP errors
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(products => {
        // If an element with id="api-status" exists, set its text.
        const statusEl = document.getElementById('api-status');
        if (statusEl) {
            statusEl.textContent = `API connected successfully. Products loaded: ${products.length}`;
        } else {
            // Fallback: log to console if the element is missing
            console.log(`API connected successfully. Products loaded: ${products.length}`);
        }
    })
    .catch(() => {
        // On any error, show a short failure message in #api-status (or console)
        const statusEl = document.getElementById('api-status');
        if (statusEl) {
            statusEl.textContent = 'API failed to load.';
        } else {
            console.error('API failed to load.');
        }
    });
