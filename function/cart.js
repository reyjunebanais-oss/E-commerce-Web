
document.addEventListener("DOMContentLoaded", () => {

    const cartIcon = document.getElementById("cart-icon");
    const cart = document.getElementById("cart");
    const cartClose = document.getElementById("cart-close");

    const cartContent = document.querySelector(".cart-content");
    const cartCount = document.getElementById("cart-count");
    const checkoutButton = document.getElementById("checkout");


    // =========================
    // OPEN CART
    // =========================

    if (cartIcon && cart) {

        cartIcon.addEventListener("click", () => {
            cart.classList.add("active");
        });

    }


    // =========================
    // CLOSE CART
    // =========================

    if (cartClose && cart) {

        cartClose.addEventListener("click", () => {
            cart.classList.remove("active");
        });

    }


    // =========================
    // ADD TO CART BUTTONS
    // =========================

    const addCartButtons =
        document.querySelectorAll(".addCart");


    addCartButtons.forEach(button => {

        button.addEventListener("click", event => {

            const productBox =
                event.target.closest(".card1");
                alert("it has been added to your cart.");

            if (!productBox) {

                alert("Product box not found");

                return;
            }

            addToCart(productBox);

        });

    });


    // =========================
    // ADD TO CART
    // =========================

    function addToCart(productBox) {

        const productImg =
            productBox.querySelector(".imageContainer img").src;

        const productTitle =
            productBox.querySelector(".Product-Title").textContent.trim();

        const productPrice =
            productBox.querySelector(".price").textContent.trim();


        // Check if product already exists

        const cartItems =
            document.querySelectorAll(".cart-product-title");


        for (let item of cartItems) {

            if (item.textContent.trim() === productTitle) {

                alert("This product is already added to your cart.");

                return;
            }

        }


        // Create cart box

        const cartBox =
            document.createElement("div");

        cartBox.classList.add("cart-box");


        cartBox.innerHTML = `

            <img
                src="${productImg}"
                class="cart-img">

            <div class="cart-detail">

                <h2 class="cart-product-title">
                    ${productTitle}
                </h2>

                <span class="cart-price">
                    ${productPrice}
                </span>

                <div class="cart-quantity">

                    <button class="decrement">
                        -
                    </button>

                    <span class="number">
                        1
                    </span>

                    <button class="increment">
                        +
                    </button>

                </div>

            </div>

            <i
                class="bi bi-trash3-fill cart-remove">
            </i>

        `;


        cartContent.appendChild(cartBox);


        // =========================
        // REMOVE PRODUCT
        // =========================

        cartBox
            .querySelector(".cart-remove")
            .addEventListener("click", () => {

                cartBox.remove();

                updateTotalPrice();
                updateCartCount();

            });


        // =========================
        // QUANTITY
        // =========================

        const quantityContainer =
            cartBox.querySelector(".cart-quantity");

        quantityContainer.addEventListener("click", event => {

            const numberElement =
                cartBox.querySelector(".number");

            let quantity =
                Number(numberElement.textContent);


            // DECREASE

            if (
                event.target.classList.contains("decrement")
                && quantity > 1
            ) {

                quantity--;

            }


            // INCREASE

            if (
                event.target.classList.contains("increment")
            ) {

                quantity++;

            }


            numberElement.textContent =
                quantity;


            updateTotalPrice();

        });


        updateTotalPrice();
        updateCartCount();

    }


    // =========================
    // CART COUNT
    // =========================

    function updateCartCount() {

        const cartBoxes =
            cartContent.querySelectorAll(".cart-box");


        const count =
            cartBoxes.length;


        if (count === 0) {

            cartCount.style.display = "none";

        } else {

            cartCount.style.display = "flex";

            cartCount.textContent = count;

        }

    }


    // =========================
    // UPDATE TOTAL
    // =========================

    function updateTotalPrice() {

        const totalPriceElement =
            document.querySelector(".total-price");


        const cartBoxes =
            cartContent.querySelectorAll(".cart-box");


        let total = 0;


        cartBoxes.forEach(cartBox => {

            const priceElement =
                cartBox.querySelector(".cart-price");

            const quantityElement =
                cartBox.querySelector(".number");


            const price =
                parseFloat(
                    priceElement.textContent
                        .replace(/[₱,\s]/g, "")
                );


            const quantity =
                parseInt(
                    quantityElement.textContent,
                    10
                );


            total += price * quantity;

        });


        totalPriceElement.textContent =
            `₱${total.toFixed(2)}`;

    }


    // =========================
    // CHECKOUT
    // =========================

    if (checkoutButton) {

        checkoutButton.addEventListener("click", () => {

            const cartBoxes =
                cartContent.querySelectorAll(".cart-box");


            // Cart empty

            if (cartBoxes.length === 0) {

                alert(
                    "Your cart is empty. Please add an item before checkout."
                );

                return;
            }


            // =========================
            // CREATE CART DATA
            // =========================

            let cartItems = [];

            let subtotal = 0;


            cartBoxes.forEach(cartBox => {

                const title =
                    cartBox
                        .querySelector(".cart-product-title")
                        .textContent
                        .trim();


                const priceText =
                    cartBox
                        .querySelector(".cart-price")
                        .textContent
                        .trim();


                const price =
                    parseFloat(
                        priceText.replace(/[₱,\s]/g, "")
                    );


                const quantity =
                    parseInt(
                        cartBox
                            .querySelector(".number")
                            .textContent,
                        10
                    );


                const image =
                    cartBox
                        .querySelector(".cart-img")
                        .src;


                // Calculate subtotal

                subtotal +=
                    price * quantity;


                // Save product

                cartItems.push({

                    title: title,

                    price: price,

                    quantity: quantity,

                    image: image

                });

            });


            // =========================
            // SHIPPING FEE
            // =========================

            const shippingFee = 20;


            // =========================
            // GRAND TOTAL
            // =========================

            const total =
                subtotal + shippingFee;


            // =========================
            // SAVE TO LOCAL STORAGE
            // =========================

            localStorage.setItem(
                "checkoutItems",
                JSON.stringify(cartItems)
            );


            localStorage.setItem(
                "checkoutSubtotal",
                subtotal
            );


            localStorage.setItem(
                "shippingFee",
                shippingFee
            );


            localStorage.setItem(
                "checkoutTotal",
                total
            );


            // =========================
            // PROCESSING
            // =========================

            checkoutButton.textContent =
                "Processing...";


            checkoutButton.disabled = true;


            setTimeout(() => {

                window.location.href =
                    "address.html";

            }, 1000);

        });

    }


    // Initial cart count

    updateCartCount();

});