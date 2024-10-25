document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 }, // Corrected price to two decimal places
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // Render the product list
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    // Handle "Add to cart" button clicks
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            if (product) {
                addToCart(product);
            }
        }
    });

    // Add selected product to cart and save to localStorage
    function addToCart(product) {
        cart.push(product); // Add the selected product to the cart
        saveCart(); // Save the cart to localStorage
        renderCart(); // Re-render the cart with updated items
    }

    // Render the cart and update the total price
    function renderCart() {
        cartItems.innerHTML = ""; // Clear the current cart items
        let totalPrice = 0; // Initialize total price to 0
    
        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden"); // Hide "empty cart" message
            cartTotalMessage.classList.remove("hidden"); // Show the total price section
    
            cart.forEach((item, index) => {
                totalPrice += item.price; // Sum up the total price of items
    
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)}  
                    <button class="delete-btn" data-id="${item.id}">Remove</button>
                `;
                cartItem.style.display = "flex";
                cartItem.style.justifyContent = "space-between";
                cartItems.appendChild(cartItem); // Add the item to the cart list
            });
    
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Update total price display
    
            // Add event listeners to all remove buttons
            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    const productId = parseInt(e.target.getAttribute("data-id"));
                    removeFromCart(productId); // Call function to remove the item from the cart
                });
            });
    
        } else {
            emptyCartMessage.classList.remove("hidden"); // Show "empty cart" message if no items
            totalPriceDisplay.textContent = "$0.00"; // Reset total price display
        }
    }
    function removeFromCart(productId) {
        // Find the index of the product to be removed
        const productIndex = cart.findIndex((item) => item.id === productId);
        
        if (productIndex > -1) {
            cart.splice(productIndex, 1); // Remove the product from the cart
            saveCart(); // Save the updated cart to localStorage
            renderCart(); // Re-render the cart
        }
    }
    

    // Save the cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart)); // Convert cart to JSON and save to localStorage
    }

    // Handle checkout button click
    checkOutBtn.addEventListener("click", () => {
        cart.length = 0; // Clear the cart
        saveCart(); // Save the cleared cart to localStorage
        alert("Checkout successfully");
        renderCart(); // Re-render the cart
    });

    // Initial render to load cart if it exists
    renderCart(); // Render the cart on page load with items from localStorage
});
