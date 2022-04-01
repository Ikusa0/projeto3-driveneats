const WHATSAPP = "https://wa.me/5583988436116?";

// Add a 'onclick' to every item
for (const item of document.querySelectorAll(".item-wrap")) {
  item.onclick = () => {
    const parentId = `#${item.parentElement.id}`;
    const selected = document.querySelector(`${parentId} .item-selected`);
    const footerButton = document.querySelector(".footer button");

    // Remove other selected items from the same row
    if (selected) {
      selected.classList.remove("item-selected");
      selected.querySelector(".icon").classList.add("display-none");
    }

    // Activate the clicked one
    item.classList.add("item-selected");
    item.querySelector(".icon").classList.remove("display-none");

    // Activate button only when all 3 rows have a selected item
    if (document.querySelectorAll(".item-selected").length === 3) {
      footerButton.classList.add("button-active");
      footerButton.innerHTML = "Fechar pedido";
      footerButton.disabled = false;
    }
  };
}

function priceToNumber(price) {
  return Number(price.replace(",", "."));
}

function numberToPrice(number) {
  return `R$ ${number.toFixed(2)}`.replace(".", ",");
}

// Open order dialog with selected items information
function openOrderDialog() {
  const background = document.querySelector(".background");
  const orderDialog = document.querySelector(".order-dialog");
  const allSelected = document.querySelectorAll(".item-selected");
  let totalPrice = 0;

  for (const selected of allSelected) {
    const parentId = `#${selected.parentElement.id}`;
    const foodName = orderDialog.querySelector(`${parentId} span`);
    const foodPrice = orderDialog.querySelector(`${parentId} span:last-child`);

    foodName.innerHTML = selected.querySelector("h4").innerHTML;
    foodPrice.innerHTML = selected.querySelector("h5").innerHTML.slice(3);

    totalPrice += priceToNumber(foodPrice.innerHTML);
  }

  orderDialog.querySelector("#total span:last-child").innerHTML = numberToPrice(totalPrice);

  background.classList.remove("display-none");
  orderDialog.classList.remove("display-none");
}

function cancelOrder() {
  const background = document.querySelector(".background");
  const orderDialog = document.querySelector(".order-dialog");

  background.classList.add("display-none");
  orderDialog.classList.add("display-none");
}

function resetOrder() {
  const allSelected = document.querySelectorAll(".item-selected");
  const footerButton = document.querySelector(".footer button");

  cancelOrder();

  for (const selected of allSelected) {
    selected.classList.remove("item-selected");
    selected.querySelector(".icon").classList.add("display-none");
  }

  footerButton.classList.remove("button-active");
  footerButton.textContent = "Selecione os 3 itens para fechar seu pedido";
  footerButton.disabled = true;
}

// Send a whatsapp message with order's information
function makeOrder() {
  const completeOrder = document.querySelectorAll(".order-dialog span:first-child");
  const orderPrice = document.querySelector(".order-dialog #total span:last-child").innerHTML;

  let name = prompt("Antes de prosseguir, por favor informe seu nome: ");
  if (!name) name = "não informado.";

  let address = prompt("Por favor, informe também o endereço: ");
  if (!address) address = "não informado.";

  const message = encodeURIComponent(`Olá, gostaria de fazer o pedido:
- Prato: ${completeOrder[0].innerHTML}
- Bebida: ${completeOrder[1].innerHTML}
- Sobremesa: ${completeOrder[2].innerHTML}
Total: ${orderPrice}
    
Nome: ${name}
Endereço: ${address}`);

  window.open(WHATSAPP + "text=" + message);
  resetOrder();
}
