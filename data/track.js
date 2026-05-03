let orders = [];

async function loadOrders() {
  const saved = localStorage.getItem("orders");

  if (saved) {
    orders = JSON.parse(saved);
  } else {
    const response = await fetch("data/orders.json");
    const data = await response.json();

    orders = data.orders;
    localStorage.setItem("orders", JSON.stringify(orders));
  }
}

async function trackOrder() {
  if (orders.length === 0) {
    await loadOrders();
  }

  const input = document.getElementById("trackInput").value.trim();
  const order = orders.find(o => o.id === input);

  if (!order) {
    document.getElementById("trackResult").innerHTML = "Order not found.";
    return;
  }

  document.getElementById("trackResult").innerHTML = `
    <h2>Order detail</h2>
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Customer:</strong> ${order.customer?.name || order.customer}</p>
    <p><strong>Email:</strong> ${order.customer?.contact?.email || order.email}</p>
    <p><strong>Status:</strong> ${order.status?.current || order.status}</p>
  `;
}

document.addEventListener("DOMContentLoaded", loadOrders);