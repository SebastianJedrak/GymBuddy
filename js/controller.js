import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import * as model from "./model.js";

const navTiles = document.querySelectorAll(".nav-tile");

function init() {
  location.hash = "#";
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
  if (state === "home") {
    homeView.renderHTML();
    backgroundGradient();
  }
  if (state === "history") {
    historyView.renderHTML();
    backgroundWhitish();
  }
  if (state === "user") {
    userView.renderHTML();
    backgroundWhitish();
  }
}

function toggleActiveNav(element) {
  [...element.parentElement.children].forEach((tile) =>
    tile.classList.remove("active")
  );
  element.classList.add("active");
}
const globalContainer = document.querySelector(".global-container");

function backgroundGradient() {
  globalContainer.classList.remove("BG-whitish");
  globalContainer.classList.add("BG-gradient");
}
function backgroundWhitish() {
  globalContainer.classList.remove("BG-gradient");
  globalContainer.classList.add("BG-whitish");
}

console.log(model.andrew);
