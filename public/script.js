const orderForm = document.getElementById("orderForm");
const ordersList = document.getElementById("ordersList");
const message = document.getElementById("message");

async function loadOrders() {
    try {
        const response = await fetch("/api/orders");
        console.log("GET /api/orders status:", response.status);

        const orders = await response.json();
        console.log("Geladene Orders:", orders);

        if (!orders.length) {
            ordersList.innerHTML = "<p>Noch keine Aufträge vorhanden.</p>";
            return;
        }

        ordersList.innerHTML = orders
            .map(
                (order) => `
          <div class="order-item">
            <p><strong>ID:</strong> ${order.id}</p>
            <p><strong>Kunde:</strong> ${order.customerName}</p>
            <p><strong>Produkt:</strong> ${order.product}</p>
            <p><strong>Menge:</strong> ${order.quantity}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
        `
            )
            .join("");
    } catch (error) {
        console.error("Fehler in loadOrders:", error);
        ordersList.innerHTML = "<p>Fehler beim Laden der Aufträge.</p>";
    }
}

orderForm.addEventListener("submit", async (event) => {
    console.log(event);
    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;

    try {
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerName,
                product,
                quantity
            })
        });

        console.log("POST /api/orders status:", response.status);

        const data = await response.json();
        console.log("Antwort POST:", data);

        if (!response.ok) {
            throw new Error(data.error || "Auftrag konnte nicht erstellt werden.");
        }

        message.textContent = "Auftrag erfolgreich erstellt.";
        orderForm.reset();
        await loadOrders();
    } catch (error) {
        console.error("Fehler beim Erstellen:", error);
        message.textContent = error.message;
    }
});

loadOrders();