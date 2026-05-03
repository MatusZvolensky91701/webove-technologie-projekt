function getOrders() {
  const savedOrders = localStorage.getItem("orders");

  if (savedOrders) {
    return JSON.parse(savedOrders);
  }

  return [];
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}