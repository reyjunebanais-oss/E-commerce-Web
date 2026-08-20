 /*
     * GET CART DATA
     */

    const cartItems =
        JSON.parse(localStorage.getItem("checkoutItems")) || [];

    const subtotal =
        Number(localStorage.getItem("checkoutSubtotal")) || 0;

    const shipping =
        Number(localStorage.getItem("shippingFee")) || 20;

    const orderItems =
        document.getElementById("orderItems");

    const subtotalElement =
        document.getElementById("subtotal");

    const shippingElement =
        document.getElementById("shipping");

    const totalElement =
        document.getElementById("total");

    const itemCount =
        document.getElementById("itemCount");


    /*
     * DISPLAY PRODUCTS
     */

    let totalQuantity = 0;

    cartItems.forEach(item => {

        totalQuantity += item.quantity;

        const itemTotal =
            item.price * item.quantity;


        const itemElement =
            document.createElement("div");

        itemElement.classList.add("cart-item");


        itemElement.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.title}">

            <div class="item-info">

                <h3>
                    ${item.title}
                </h3>

                <p>
                    Qty: ${item.quantity}
                </p>

            </div>

            <div class="item-price">

                ₱${itemTotal.toFixed(2)}

            </div>

        `;


        orderItems.appendChild(itemElement);

    });


    /*
     * DISPLAY TOTALS
     */

    const total =
        subtotal + shipping;


    itemCount.textContent =
        `Subtotal (${totalQuantity} items)`;

    subtotalElement.textContent =
        `₱${subtotal.toFixed(2)}`;

    shippingElement.textContent =
        `₱${shipping.toFixed(2)}`;

    totalElement.textContent =
        `₱${total.toFixed(2)}`;


    /*
     * PAYMENT METHOD
     */

    const payments =
        document.querySelectorAll(".payment");

    let selectedPayment =
        "Cash on Delivery";


    payments.forEach(payment => {

        payment.addEventListener("click", () => {

            payments.forEach(p => {
                p.classList.remove("active");
            });

            payment.classList.add("active");

            selectedPayment =
                payment.dataset.payment;

        });

    });


    /*
     * PLACE ORDER
     */

    document
        .getElementById("placeOrder")
        .addEventListener("click", () => {


        const fullName =
            document.getElementById("fullName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const zip =
            document.getElementById("zip").value.trim();

        const notes =
            document.getElementById("notes").value.trim();


        /*
         * VALIDATION
         */

        if (fullName === "") {

           window.location.href="orderFailed.html";

            return;
        }


        if (phone === "") {

            window.location.href="orderFailed.html";

            return;
        }


        if (address === "") {

            window.location.href="orderFailed.html";

            return;
        }


        if (zip === "") {

             window.location.href="orderFailed.html";

            return;
        }


        /*
         * SAVE ORDER
         */

        const order = {

            customer: {

                fullName: fullName,

                phone: phone,

                address: address,

                zip: zip

            },

            paymentMethod:
                selectedPayment,

            notes:
                notes,

            items:
                cartItems,

            subtotal:
                subtotal,

            shipping:
                shipping,

            total:
                total

        };


        localStorage.setItem(
            "order",
            JSON.stringify(order)
        );


        /*
         * SUCCESS
         */

        alert(
            "Order placed successfully!\n\n" +
            "Customer: " + fullName +
            "\nPayment: " + selectedPayment +
            "\nTotal: ₱" + total.toFixed(2)
        );


        // Save the completed order
localStorage.setItem(
    "order",
    JSON.stringify(order)
);

// Clear checkout data
localStorage.removeItem("checkoutItems");
localStorage.removeItem("checkoutSubtotal");
localStorage.removeItem("shippingFee");
localStorage.removeItem("checkoutTotal");

// Go to Order Placed page
window.location.href = "placed.html";
    });
    