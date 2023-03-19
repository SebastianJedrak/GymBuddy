import View from "./view.js";

class HistoryView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _headerConfig = [`History`, false, false];

  _HTML() {
    if (this._data.length > 0) {
      return `<div class="filter-sort-container">
    <button class="btn btn-50 btn-sort">Latest</button>
    <div class="dropdown-filter-container">
    <button class="btn btn-navy btn-50 btn-filter">
    Filter
      <div class="dropdown-arrow"></div>
    </button>
    <ul class="dropdown-options-list hidden">
      <li class="dropdown-options-item" data-exp="beginner">beginner</li>
      <li class="dropdown-options-item" data-exp="intermediate">mid</li>
    </ul>
  </div>
  </div>
  <div class="history-container">
    <ul class="history-list">
    </ul>
  </div>`;
    } else {
      return `History empty`;
    }
  }

  addHistoryItems() {
    const listContainer = document.querySelector(".history-list");
    this._data.forEach((item) => {
      const html = `      <li class="history-item" data-index="${item.index}">
      <div class="header-delete-container">
        <h4 class="workout-history-header">Workout ${item.index + 1}</h4>
        <div class="svg-delete header-buttons-svg back-button"></div>
      </div>
      <div class="workout-details-container">
        <span class="workout-details-date">${item.date}</span>
        <span class="workout-details-body-part">${
          item.bodyPart.slice(0, 1).toUpperCase() +
          item.bodyPart.slice(1).toLowerCase()
        } body</span>
        <span class="workout-details-duration">${item.duration}</span>
        <span class="workout-details-type">${item.type} training</span>
      </div>
    </li>`;
      listContainer.insertAdjacentHTML("afterbegin", html);
    });
  }

  deleteWorkoutListener(handler) {
    const itemsList = document.querySelector(".history-list");
    if (!itemsList) return;
    itemsList.addEventListener("click", function (e) {
      const target = e.target.closest(".svg-delete");
      if (!target) return;
      const item = target.closest(".history-item");
      handler(item);
    });
  }

  sortWorkoutsListener(handler) {
    const btnSort = document.querySelector(".btn-sort");
    if (!btnSort) return;
    btnSort.addEventListener("click", handler);
  }

  filterWorkoutsListener(handler) {
    const btnFilter = document.querySelector(".btn-filter");
    if (!btnFilter) return;
    btnFilter.addEventListener("click", handler);
  }
}

export default new HistoryView();
