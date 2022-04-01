const items = document.querySelectorAll(".item-wrap"); // All items for sell
const button = document.querySelector(".footer").children[0]; // Main button
// Object to store order's information
const order = {
  prato: null,
  bebida: null,
  sobremesa: null,
};
const background = document.querySelector(".background"); // White background shown in order confirmation dialog
const orderDialog = document.querySelector(".order"); // Order confirmation dialog
const whatsapp = "https://wa.me/5583988436116?"; // Restaurant whatsapp address

// Add a 'click' event listener to every item
for (const item of items) {
  item.addEventListener("click", () => {
    const parent = item.parentElement;
    // Remove other selected items from the same row
    for (const child of parent.children) {
      if (child.classList.contains("item-selected")) {
        child.classList.remove("item-selected");
        child.children[2].classList.add("display-none");
      }
    }
    // Activate the clicked one
    item.classList.add("item-selected");
    item.children[2].classList.remove("display-none");

    const type = parent.parentElement.id; // Get row name by parent's id

    // Store clicked item's information
    order[type] = {
      name: item.children[1].children[0].textContent,
      description: item.children[1].children[1].textContent,
      price: Number(item.children[1].children[2].textContent.slice(3).replace(",", ".")),
    };

    // Activate button only when all 3 rows have a selected item
    if (Object.values(order).every(Boolean)) {
      button.classList.add("button-active");
      button.textContent = "Fechar pedido";
      button.disabled = false;
    }
  });
}

// Open order dialog with selected items information
function openOrderDialog() {
  orderDialog.children[1].children[0].textContent = order.prato.name;
  orderDialog.children[1].children[1].textContent = order.prato.price.toFixed(2).replace(".", ",");

  orderDialog.children[2].children[0].textContent = order.bebida.name;
  orderDialog.children[2].children[1].textContent = order.bebida.price.toFixed(2).replace(".", ",");

  orderDialog.children[3].children[0].textContent = order.sobremesa.name;
  orderDialog.children[3].children[1].textContent = order.sobremesa.price.toFixed(2).replace(".", ",");

  orderDialog.children[4].children[1].textContent = `R$ ${(
    order.prato.price +
    order.bebida.price +
    order.sobremesa.price
  )
    .toFixed(2)
    .replace(".", ",")}`;

  background.classList.remove("display-none");
  orderDialog.classList.remove("display-none");
}

function cancelOrder() {
  background.classList.add("display-none");
  orderDialog.classList.add("display-none");
}

function resetOrder() {
  cancelOrder();

  order.prato = null;
  order.bebida = null;
  order.sobremesa = null;

  for (const item of document.querySelectorAll(".item-selected")) {
    item.classList.remove("item-selected");
    item.children[2].classList.add("display-none");
  }

  button.classList.remove("button-active");
  button.textContent = "Selecione os 3 itens para fechar seu pedido";
  button.disabled = true;
}

// Send a whatsapp message with order's information
function makeOrder() {
  let name = prompt("Antes de prosseguir, por favor informe seu nome: ");
  if (!name) name = "não informado.";
  let address = prompt("Por favor, informe também o endereço: ");
  if (!address) address = "não informado.";
  const message = encodeURIComponent(`Olá, gostaria de fazer o pedido:
- Prato: ${order.prato.name}
- Bebida: ${order.bebida.name}
- Sobremesa: ${order.sobremesa.name}
Total: R$ ${(order.prato.price + order.bebida.price + order.sobremesa.price).toFixed(2).replace(".", ",")}
    
Nome: ${name}
Endereço: ${address}`);

  window.open(whatsapp + "text=" + message);
  resetOrder();
}
