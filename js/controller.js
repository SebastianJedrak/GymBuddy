import workoutView from "./views/workoutView.js";
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
  if (state === "workout") workoutView.renderWorkout();
  if (state === "history") historyView.renderHistory();
  if (state === "user") userView.renderUser();
}

function toggleActiveNav(element) {
  [...element.parentElement.children].forEach((tile) =>
    tile.classList.remove("active")
  );
  element.classList.add("active");
}
