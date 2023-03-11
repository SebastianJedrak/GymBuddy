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
    <h4 class="user-parameters">${
      this._data.gender.slice(0, 1).toUpperCase() +
      this._data.gender.slice(1).toLowerCase()
    } ${this._data.height} cm ${this._data.weight} kg</h4>
    <div class="edit-user edit-user-parameters"></div>
  </div>
  <div class="bmi-meter-container">
    <div class="bmi-meter"></div>
    <div class="bmi-meter-arrow"></div>
  </div>
  <h3 class="bmi-number">BMI: ${this._data.BMI}</h3>
  <h4 class="bmi-label"></h4>
  </div>`;
  }

  renderLabelBMI() {
    const label = document.querySelector(".bmi-label");
    label.textContent = "";
    if (this._data.BMI >= 30) {
      label.style.color = "#f26d24";
      label.textContent = `obesity`;
      return;
    }
    if (this._data.BMI >= 25) {
      label.style.color = "#f7b11e";
      label.textContent = `overweight`;
      return;
    }
    if (this._data.BMI >= 18.5) {
      label.style.color = "#99c817";
      label.textContent = `healthy weight`;
      return;
    }
    if (this._data.BMI < 18.5) {
      label.style.color = "#fdeb48";
      label.textContent = `underweight`;
      return;
    }
  }

  animateArrow() {
    const arrow = document.querySelector(".bmi-meter-arrow");
    // BMI 40 = 100% 180deg = 100%
    const position = (this._data.BMI / 40) * 100;
    const positionProcent = (position / 180) * 100;
    const rotateTo = (positionProcent * 180) / 100;
    console.log(this._data.BMI);
    console.log(position);
    console.log(positionProcent);
    console.log(rotateTo);
    arrow.animate(
      [{ transform: "rotate(10deg)" }, { transform: `rotate(${rotateTo}deg)` }],
      { duration: 2000 }
    );
  }
}

export default new UserView();
