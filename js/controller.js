import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import * as model from "./model.js";

const navTiles = document.querySelectorAll(".nav-tile");

function init() {
  location.hash = "";
}
init();

navTiles.forEach((tile) =>
  tile.addEventListener("click", function () {
    const hash = "#" + this.dataset.tile;
    window.history.pushState(null, "", hash);
    renderView(location.hash.slice(1));
    toggleActiveNav(this);
  })
);

function renderView(state) {
  if (state === "workout") homeView.render();
  if (state === "history") historyView.render();
  if (state === "user") userView.render();
}

function toggleActiveNav(element) {
  [...element.parentElement.children].forEach((tile) =>
    tile.classList.remove("active")
  );
  element.classList.add("active");
}

console.log(model.andrew);
