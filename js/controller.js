const navTiles = document.querySelectorAll(".nav-tile");
const main = document.querySelector(".main-content");

navTiles.forEach((tile) =>
  tile.addEventListener("click", function () {
    const hash = "#" + this.dataset.tile;
    window.history.pushState(null, "", hash);
    render(location.hash.slice(1));
  })
);

function render(state) {
  if (state === "workout") renderWorkout();
  if (state === "history") renderHistory();
  if (state === "user") renderUser();
}

function renderWorkout() {
  clear(main);
  main.insertAdjacentHTML("afterbegin", "<span>workout</span>");
}
function renderHistory() {
  clear(main);
  main.insertAdjacentHTML("afterbegin", "<span>history</span>");
}

function renderUser() {
  clear(main);
  main.insertAdjacentHTML("afterbegin", "<span>user</span>");
}

function clear(element) {
  element.textContent = "";
}
