import View from "./view.js";

class UserView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = true;
  _backgroundType = "whitish";
  _headerConfig = [`User`, false, false, true];

  _HTML() {
    return ` 
    <dialog class="modal modal-edit-acc modal-edit-acc-profile modal-white">
        <div class="modal-content-wrapper">
          <h2>Edit Profile</h2>
          <form action="" class="profile-edit-form-container">
            <input
              type="text"
              placeholder="New login"
              class="input edit-login"
              data-placeholder="New login"
            />
            <input
              type="text"
              placeholder="Old password"
              class="input edit-password-old"
              data-placeholder="Old password"
            />
            <input
              type="text"
              placeholder="New password"
              class="input edit-password-new"
              data-placeholder="New password"
            />
          </form>
          <div class="red-green-btn-container">
            <button class="btn btn-50 btn-navy btn-edit-profile-cancel">
              <span>Cancel</span>
            </button>
            <button class="btn btn-50 btn-white btn-edit-profile-save">
              <span>Save</span>
            </button>
          </div>
          <button class="btn btn-100 btn-red btn-edit-profile-delete">
            <span>Delete Account</span>
          </button>
        </div>
      </dialog>       
      <dialog
        class="modal modal-edit-parameters modal-edit-acc-profile modal-white"
      >
        <div class="modal-content-wrapper">
          <h3>Edit Parameters</h3>
          <form action="" class="profile-edit-form-container">
            <input
              type="number"
              placeholder="Height cm"
              class="input reg-height"
              data-placeholder="Height cm"
            /><input
              type="number"
              placeholder="Weight kg"
              class="input reg-weight"
              data-placeholder="Weight kg"
            />
            <div class="radial-container radial-edit-container">
              <span><b>Gender:</b></span>
              <label
                ><input
                  type="radio"
                  name="gender"
                  class="radio"
                  value="man"
                  
                />Man</label
              >
              <label
                ><input
                  type="radio"
                  name="gender"
                  class="radio"
                  value="woman"
                />Woman</label
              >
            </div>
          </form>
          <div class="red-green-btn-container">
            <button class="btn btn-50 btn-navy btn-edit-parameters-cancel">
              <span>Cancel</span>
            </button>
            <button class="btn btn-50 btn-white btn-edit-parameters-save">
              <span>Save</span>
            </button>
          </div>
        </div>
      </dialog>
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
      <h4 class="experience-active-btn">${
        this._data.experience === "intermediate" ? "mid" : "beginner"
      }</h4>
      <div class="dropdown-arrow"></div>
    </button>
    <ul class="dropdown-options-list hidden">
      <li class="dropdown-options-item" data-exp="beginner">beginner</li>
      <li class="dropdown-options-item" data-exp="intermediate">mid</li>
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

  avatarGenderSwitch() {
    const avatar = document.querySelector(".avatar");
    if (this._data.gender === "man") {
      avatar.classList.remove("avatar-woman");
      avatar.classList.add("avatar-man");
    }
    if (this._data.gender === "woman") {
      avatar.classList.remove("avatar-men");
      avatar.classList.add("avatar-woman");
    }
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
      label.style.color = "#aedadd";
      label.textContent = `underweight`;
      return;
    }
  }

  animateArrow() {
    const arrow = document.querySelector(".bmi-meter-arrow");
    // BMI 30 = 100% 150deg = 100%
    const position = (this._data.BMI / 30) * 100;
    const rotateTo = (position * 150) / 100;
    arrow.animate(
      [
        { transform: "rotate(10deg)" },
        { transform: `rotate(${rotateTo < 180 ? rotateTo : 180}deg)` },
      ],
      { duration: 2000, fill: "forwards" }
    );
  }

  openDropdownListener() {
    document
      .querySelector(".dropdown-experience-current-container")
      .addEventListener("click", () => {
        document
          .querySelector(".dropdown-options-list")
          .classList.toggle("hidden");
        document.querySelector(".dropdown-arrow").classList.toggle("rotate180");
      });
  }

  dropdownItemListListener(handler) {
    const listItem = document.querySelectorAll(".dropdown-options-item");
    listItem.forEach((item) => item.addEventListener("click", handler));
  }

  logoutButtonListener(handler) {
    document.querySelector(".logout-button").addEventListener("click", handler);
  }

  modalProfileEditListener(handlerSave, handlerDelete) {
    const editAcc = document.querySelector(".modal-edit-acc");
    document
      .querySelector(".edit-user-name")
      .addEventListener("click", function () {
        editAcc.showModal();
        document
          .querySelector(".btn-edit-profile-cancel")
          .addEventListener("click", function () {
            editAcc.close();
          });
        document
          .querySelector(".btn-edit-profile-save")
          .addEventListener("click", handlerSave);
        document
          .querySelector(".btn-edit-profile-delete")
          .addEventListener("click", handlerDelete);
      });
  }

  modalParametersEditListener(handlerSave) {
    const editParameters = document.querySelector(".modal-edit-parameters");
    document
      .querySelector(".edit-user-parameters")
      .addEventListener("click", function () {
        editParameters.showModal();
        document
          .querySelector(".btn-edit-parameters-cancel")
          .addEventListener("click", function () {
            editParameters.close();
          });
        document
          .querySelector(".btn-edit-parameters-save")
          .addEventListener("click", handlerSave);
      });
  }
}

export default new UserView();
