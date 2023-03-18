import View from "./view.js";

class HistoryView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _headerConfig = [`History`, false, false];

  _HTML() {
    return `<div class="filter-sort-container">
    <button class="btn btn-white btn-50 btn-sort">Sort</button
    ><button class="btn btn-white btn-50 btn-filter">Filter</button>
  </div>
  <div class="history-container">
    <ul class="history-list">
    </ul>
  </div>`;
  }

  addHistoryItems() {
    const listContainer = document.querySelector(".history-list");
    this._data.forEach((item, i) => {
      const html = `      <li class="history-item">
      <div class="header-delete-container">
        <h4 class="workout-history-header">Workout ${i + 1}</h4>
        <div class="svg-delete header-buttons-svg back-button"></div>
      </div>
      <div class="workout-details-container">
        <span class="workout-details-date">02-02-2023</span>
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
}

export default new HistoryView();
