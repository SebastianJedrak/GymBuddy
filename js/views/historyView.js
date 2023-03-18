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
      <li class="history-item">
        <div class="header-delete-container">
          <h4 class="workout-history-header">Workout 1</h4>
          <div class="svg-delete header-buttons-svg back-button"></div>
        </div>
        <div class="workout-details-container">
          <span class="workout-details-date">02-02-2023</span>
          <span class="workout-details-body-part">Full body</span>
          <span class="workout-details-duration">long</span>
          <span class="workout-details-type">balanced</span>
        </div>
      </li>
      <li class="history-item">
        <div class="header-delete-container">
          <h4 class="workout-history-header">Workout 1</h4>
          <div class="svg-delete header-buttons-svg back-button"></div>
        </div>
        <div class="workout-details-container">
          <span class="workout-details-date">02-02-2023</span>
          <span class="workout-details-body-part">Full body</span>
          <span class="workout-details-duration">long</span>
          <span class="workout-details-type">balanced</span>
        </div>
      </li>
    </ul>
  </div>`;
  }
}

export default new HistoryView();
