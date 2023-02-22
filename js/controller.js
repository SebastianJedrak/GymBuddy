import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import navigatorView from "./views/navigatorView.js";
import workoutView from "./views/workoutView.js";
import * as model from "./model.js";

function init() {
  location.hash = "#";
  navigatorView.navigatorRender();
  renderHome();
}
init();

function renderHome() {
  homeView.renderView();
  homeView.startListener(workoutView.renderView.bind(workoutView));
}

console.log(model.andrew);

//! RENDER VIEW CONTROL

function renderView(state) {
  if (state === "home") {
    renderHome();
  }
  if (state === "history") {
    historyView.renderView();
  }
  if (state === "user") {
    userView.renderView();
  }
}

//! NAVIGATION CONTROL

const navTiles = document.querySelectorAll(".nav-tile");

navTiles.forEach((tile) =>
  tile.addEventListener("click", function () {
    const hash = "#" + this.dataset.tile;
    window.history.pushState(null, "", hash);
    renderView(location.hash.slice(1));
    toggleActiveNav(this);
  })
);

function toggleActiveNav(element) {
  [...element.parentElement.children].forEach((tile) =>
    tile.classList.remove("active")
  );
  element.classList.add("active");
}
