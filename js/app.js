const items = document.querySelectorAll(".item-wrap");

for (const item of items) {
  item.addEventListener("click", () => {
    const parent = item.parentElement;
    for (const child of parent.children) {
      if (child.classList.contains("item-selected")) {
        child.classList.remove("item-selected");
        child.children[2].classList.add("display-none");
      }
    }
    item.classList.add("item-selected");
    item.children[2].classList.remove("display-none");
  });
}
