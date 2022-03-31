const items = document.querySelectorAll(".item-wrap"); // All items for sell
const button = document.querySelector(".footer").children[0]; // Main button
// Object to store order's information
const selection = {
  prato: null,
  bebida: null,
  sobremesa: null,
};
const background = document.querySelector(".background"); // White background shown in order confirmation dialog
const order = document.querySelector(".order"); // Order confirmation dialog
const whatsapp = "https://wa.me/5583988436116?"; // Restaurant whatsapp address

// Add a 'click' event to every item
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
    selection[type] = {
      name: item.children[1].children[0].textContent,
      description: item.children[1].children[1].textContent,
      price: Number(item.children[1].children[2].textContent.slice(3).replace(",", ".")),
    };

    // Activate button only when all 3 rows have a selected item
    if (Object.values(selection).every(Boolean)) {
      button.classList.add("button-active");
      button.textContent = "Fechar pedido";
      button.disabled = false;
    }
  });
}

// Open order dialog with selected items information
function openOrderDialog() {
  order.children[1].children[0].textContent = selection.prato.name;
  order.children[1].children[1].textContent = selection.prato.price.toFixed(2).replace(".", ",");

  order.children[2].children[0].textContent = selection.bebida.name;
  order.children[2].children[1].textContent = selection.bebida.price.toFixed(2).replace(".", ",");

  order.children[3].children[0].textContent = selection.sobremesa.name;
  order.children[3].children[1].textContent = selection.sobremesa.price.toFixed(2).replace(".", ",");

  order.children[4].children[1].textContent = `R$ ${(
    selection.prato.price +
    selection.bebida.price +
    selection.sobremesa.price
  )
    .toFixed(2)
    .replace(".", ",")}`;

  background.classList.remove("display-none");
  order.classList.remove("display-none");
}

// Send a whatsapp message with order's information
function makeOrder() {
  const name = prompt("Antes de prosseguir, por favor informe seu nome: ");
  const address = prompt("Por favor, informe também o endereço: ");
  const message = encodeURIComponent(`Olá, gostaria de fazer o pedido:
- Prato: ${selection.prato.name}
- Bebida: ${selection.bebida.name}
- Sobremesa: ${selection.sobremesa.name}
Total: R$ ${(selection.prato.price + selection.bebida.price + selection.sobremesa.price).toFixed(2).replace(".", ",")}
    
Nome: ${name}
Endereço: ${address}`);

  window.open(whatsapp + "text=" + message);
}

function cancelOrder() {
  background.classList.add("display-none");
  order.classList.add("display-none");
}
