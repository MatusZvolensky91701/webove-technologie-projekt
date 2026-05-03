let orders = getOrders();

const saved = localStorage.getItem("orders");

if (saved) {
  orders = JSON.parse(saved);
  renderOrders();
} else {
  fetch("data/orders.json")
    .then(res => res.json())
    .then(data => {
      orders = data.orders;
      localStorage.setItem("orders", JSON.stringify(orders));
      renderOrders();
    });
}

function renderOrders() {
  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  orders.forEach(order => {
    table.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer?.name || order.customer}</td>
        <td>${order.customer?.contact?.email || order.email}</td>
        <td>${order.status?.current || order.status}</td>
        <td>
          <button onclick="editOrder('${order.id}')">Edit</button>
        </td>
      </tr>
    `;
  });
}

function addOrder() {
  const id = document.getElementById("newId").value;
  const customer = document.getElementById("newCustomer").value;
  const email = document.getElementById("newEmail").value;
  const status = document.getElementById("newStatus").value;

  if (id === "" || customer === "" || email === "") {
    alert("Fill all fields.");
    return;
  }

  const newOrder = {
    id: id,
    customer: customer,
    email: email,
    status: status
  };

  orders.push(newOrder);
  saveOrders(orders);
  renderOrders();

  alert("Order was added.");
}

function editOrder(id) {
  const order = orders.find(o => o.id === id);

  document.getElementById("editId").value = order.id;
  document.getElementById("editStatus").value = order.status;
}

function saveEdit() {
  const id = document.getElementById("editId").value;
  const status = document.getElementById("editStatus").value;

  const order = orders.find(o => o.id === id);
  order.status = status;

  saveOrders(orders);
  renderOrders();

  alert("Order was updated.");
}

renderOrders();
  function generateOrders(count = 20) {
  const names = ["Matus", "Peter", "Anna", "Lucia", "Martin", "Eva"];
  const surnames = ["Novak", "Kovac", "Zvolensky", "Horvat", "Kral"];
  const statuses = ["Received", "Processing", "On the way", "Delivered"];

  const newOrders = [];

  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];

    const id = "OBJ-2026-" + Math.floor(Math.random() * 90000 + 10000);
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    newOrders.push({
      id: id,
      customer: name + " " + surname,
      email: name.toLowerCase() + "@mail.com",
      status: status
    });
  }

  orders = newOrders;
  localStorage.setItem("orders", JSON.stringify(orders));

  renderOrders();
}