import View from "./view.js";

class HistoryView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _headerConfig = [`History`, false, false];

  _HTML() {
    if (this._data.length > 0) {
      return `
      <dialog class="modal open modal-white modal-delete-item">
        <div class="modal-content-wrapper">
          <h2>Delete</h2>
          <p class="exit-workout-content">
            Do you really want to delete your workout? This action will be irreversible.
          </p>
          <div class="red-green-btn-container">
            <button class="btn btn-50 btn-navy btn-delete-no">
              <span>No</span>
            </button>
            <button class="btn btn-50 btn-white btn-exit-yes">
              <span>Yes</span>
            </button>
          </div>
        </div>
      </dialog>
      <div class="filter-sort-container">
    <button class="btn btn-50 btn-sort">Latest</button>
    <div class="dropdown-filter-container">
    <button class="btn btn-navy btn-50 btn-filter">
    <span class="filter-text">Filter</span>
      <div class="dropdown-arrow dropdown-arrow-filter"></div>
    </button>
    <ul class="dropdown-options-list hidden dropdown-options-list-filter">
    <li class="dropdown-options-item" data-filter="all">All</li>
      <li class="dropdown-options-item" data-filter="lower">Lower</li>
      <li class="dropdown-options-item" data-filter="full">Full</li>
      <li class="dropdown-options-item" data-filter="upper">Upper</li>
    </ul>
  </div>
  </div>
  <div class="history-container">
    <ul class="history-list">
    </ul>
  </div>`;
    } else {
      return `<div class="no-history-container">
      <div class="no-history-svg"></div>
      <h3 class="no-history-text">No workouts done yet!</h3>
    </div>`;
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
    const modal = document.querySelector(".modal-delete-item");
    const modalNo = document.querySelector(".btn-delete-no");
    const modalYes = document.querySelector(".btn-delete-yes");
    if (!itemsList) return;
    itemsList.addEventListener("click", function (e) {
      const target = e.target.closest(".svg-delete");
      if (!target) return;
      const item = target.closest(".history-item");
      modal.showModal();
      modalNo.addEventListener("click", () => {
        modal.close();
      });
      modalYes.addEventListener("click", handler(item));
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

  openFilterDropdownListener() {
    const btnFilter = document.querySelector(".btn-filter");
    if (!btnFilter) return;
    btnFilter.addEventListener("click", () => {
      document
        .querySelector(".dropdown-options-list-filter")
        .classList.toggle("hidden");
      document
        .querySelector(".dropdown-arrow-filter")
        .classList.toggle("rotate180");
    });
  }

  dropdownFilterListListener(handler) {
    const listItem = document.querySelectorAll(".dropdown-options-item");
    listItem.forEach((item) => item.addEventListener("click", handler));
  }
}

export default new HistoryView();
