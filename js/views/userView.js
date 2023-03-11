import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _headerConfig = [`User`, false, false, true];

  _HTML() {
    return `        
    <div class="avatar-name-experience-container">
    <div class="avatar-name-container">
    <div class="avatar avatar-man"></div>
    <div class="name-edit-container">
      <h3 class="user-name">${this._data.login}</h3>
      <div class="edit-user edit-user-name"></div>
    </div>
  </div>
  <div class="dropdown-experience-container">
    <button
      class="btn btn-navy btn-33 dropdown-experience-current-container"
    >
      <h4 class="experience-active-btn">beginner</h4>
      <div class="dropdown-arrow"></div>
    </button>
    <ul class="dropdown-options-list hidden">
      <!-- hidden -->
      <li class="dropdown-options-item">beginner</li>
      <li class="dropdown-options-item">intermediate</li>
    </ul>
  </div>
  </div>
  <div class="parameters-meter-bmi-container">
  <div class="user-parameters-container">
    <h4 class="user-parameters">Man 175 cm 89kg</h4>
    <div class="edit-user edit-user-parameters"></div>
  </div>
  <div class="bmi-meter-container">
    <div class="bmi-meter"></div>
    <div class="bmi-meter-arrow"></div>
  </div>
  <h3 class="bmi-number">BMI: 20,1</h3>
  <h4 class="bmi-label">Underweight</h4>
  </div>`;
  }
}

export default new UserView();
