import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import workoutView from "./views/workoutView.js";
import navigatorView from "./views/navigatorView.js";
import spinnerView from "./views/spinnerView.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import * as model from "./model.js";

//! RENDER CONTROL

export let activeUser;

function init() {
  // storage reset
  // localStorage.clear();
  // sessionStorage.clear();
  // For testing
  // activeUser = model.bobby;
  // renderHome();
  // Get data from storage
  model.storageGetData();
  activeUser = model.sessionGetData();
  if (activeUser) renderHome();
  // Render login
  if (!activeUser) renderLogin();
}
init();

function renderHome() {
  // Render HTML
  homeView.renderView(model.storageSaveData());
  // Navigation bar init
  navStart();
  document.querySelector(".nav-tile-home").classList.add("active");
  // Start button listener
  homeView.startWorkoutListener(renderWorkout.bind(workoutView));
  // Parameters listeners
  parametersListeners();
  // Tutorial listener
  homeView.openTutorialModalListener();
  // Reset workoutParametersObject
  model.workoutParameters.date = "";
  model.workoutParameters.bodyPart = "full";
  model.workoutParameters.type = "balanced";
  model.workoutParameters.duration = "medium";
}

function renderUser() {
  // Get current user
  userView.getDataToRender(activeUser);
  // Render HTML
  userView.renderView(model.storageSaveData());
  // Render avatar
  userView.avatarGenderSwitch();
  // Render BMI label
  userView.renderLabelBMI();
  // Animate arrow
  userView.animateArrow();
  // Listeners
  userView.openDropdownListener();
  userView.dropdownItemListListener(dropdownItemListHandler);
  userView.logoutButtonListener(renderLogin);
  userView.modalProfileEditListener(saveEditProfileHandler, deleteAccHandler);
  userView.modalParametersEditListener(saveEditParametersHandler);
  // Navigation bar
  navStart();
  document.querySelector(".nav-tile-user").classList.add("active");
}

function renderHistory() {
  // Get current user
  historyView.getDataToRender(activeUser.workoutsHistory);
  // Render HTML
  historyView.renderView(model.storageSaveData());
  // Add sort button state
  sortBtnState();
  // Add history items
  historyView.addHistoryItems();
  // Navigation bar
  navStart();
  document.querySelector(".nav-tile-history").classList.add("active");
  // Listeners
  historyView.deleteWorkoutListener(deleteWorkoutHandler);
  historyView.sortWorkoutsListener(sortWorkoutsHandler);
  historyView.filterWorkoutsListener();
  historyView.openFilterDropdownListener();
  historyView.dropdownFilterListListener(dropdownFilterListHandler);
}

async function renderWorkout() {
  // Loading
  spinnerView.renderView();
  // Generator
  await model.generateExercises();
  // Send workout data to render view
  workoutView.getDataToRender(model.workout, model.workoutParameters);
  // Render View
  renderWorkoutView();
}

function renderWorkoutView() {
  // Render HTML
  workoutView.renderView();
  // Back button
  workoutView.backListener(backHomeHandler);
  // Done button
  workoutView.doneListener(doneHandler);
  // Skip button
  workoutView.skipToListener(skipToHandler);
  // Update progress bar
  workoutView.progressBar();
  // Light and Heavy listeners
  workoutView.heavyListener(heavyHandler);
  workoutView.lightListener(lightHandler);
  // Info Modal window listener
  workoutView.openInfoModalListener();
  // Render equipment img
  workoutView._generateImgEq();
}

function renderRegisterView() {
  // Render view
  registerView.renderView(model.storageSaveData());
  //Listeners
  registerView.backBtnListener(renderLogin);
  registerView.regSubmitAction(regSubmitHandler);
}

function renderLogin() {
  // Reset state
  activeUser = "";
  document
    .querySelectorAll(".input")
    .forEach((input) => input.classList.remove("input-error"));
  // Render start
  loginView.startLogoControl();
  //Render login
  loginView.renderView(model.storageSaveData());
  // Login action
  loginView.submitAction(loginAction);
  //Listeners
  loginView.registerBtnListener(renderRegisterView);
}

function navStart() {
  navigatorView.userListener(renderUser);
  navigatorView.homeListener(renderHome);
  navigatorView.historyListener(renderHistory);
}

//! LISTENERS

// HOME LISTENERS

function parametersListeners() {
  homeView.partParameterListener(parameterListenerHandler);
  homeView.typeParameterListener(parameterListenerHandler);
  homeView.durationParameterListener(parameterListenerHandler);
}

function parameterListenerHandler() {
  // change active button
  [...this.parentElement.children].forEach((e) => {
    e.children[0].classList.remove("btn-orange");
    e.children[0].classList.add("btn-white");
  });
  this.children[0].classList.add("btn-orange");
  // get dataset and set to model.workoutParameters object
  if (this.dataset.part) {
    model.workoutParameters.bodyPart = this.dataset.part;
  }
  if (this.dataset.type) model.workoutParameters.type = this.dataset.type;
  if (this.dataset.duration)
    model.workoutParameters.duration = this.dataset.duration;
}

// WORKOUT HANDLERS

function doneHandler() {
  if (
    workoutView.currentSet < model.workout.sets[workoutView.currentExercise]
  ) {
    workoutView.currentSet += 1;
    workoutView.playSoundNext();
    return renderWorkoutView();
  }
  if (workoutView.currentExercise === model.workout.exercises.length - 1) {
    resetWorkoutView();
    workoutView.insertToLastSetList();
    workoutView.playSoundFinish();
    return workoutView.renderEndModal(renderEndModalHandler);
  }
  workoutView.currentSet = 1;
  workoutView.currentExercise += 1;
  workoutView.playSoundNext();
  renderWorkoutView();
}

function skipToHandler() {
  if (workoutView.currentExercise === model.workout.exercises.length - 1) {
    resetWorkoutView();
    workoutView.insertToLastSetList();
    workoutView.playSoundFinish();
    return workoutView.renderEndModal(renderEndModalHandler);
  }
  for (
    let i = 0;
    i <
    model.workout.sets[workoutView.currentExercise] - workoutView.currentSet;
    i++
  ) {
    workoutView.progressBar();
  }
  workoutView.currentSet = 1;
  workoutView.currentExercise += 1;
  workoutView.playSoundNext();
  renderWorkoutView();
}

function renderEndModalHandler() {
  for (let i = 0; i < model.workout.exercises.length; i++) {
    activeUser.lastSetsArray.push([
      model.workout.exercises[i].name,
      Number.isFinite(model.exerciseRp(i))
        ? model.exerciseRp(i)
        : model.workout.reps[i],
    ]);
  }
  model.workoutParameters.date = getDate();
  model.workoutParameters.index = activeUser.workoutsHistory.length;
  const historyItem = { ...model.workoutParameters };
  activeUser.workoutsHistory.push(historyItem);
  renderHome();
}

function getDate() {
  const fullDate = new Date();
  const workoutDate = `${String(fullDate.getDate()).padStart(2, "0")}-${String(
    fullDate.getMonth() + 1
  ).padStart(2, "0")}-${fullDate.getFullYear()}`;
  return workoutDate;
}

function backHomeHandler() {
  resetWorkoutView();
  return renderHome();
}

function resetWorkoutView() {
  workoutView.currentExercise = 0;
  workoutView.currentSet = 1;
  workoutView.progress = 0;
}

function heavyHandler() {
  if (!Number.isFinite(model.workout.weight[workoutView.currentExercise])) {
    if (model.workout.reps[workoutView.currentExercise] === 2) return;
    model.workout.reps[workoutView.currentExercise] -= 1;
  } else {
    if (model.workout.weight[workoutView.currentExercise] === 2) {
      if (model.workout.reps[workoutView.currentExercise] === 2) return;
      model.workout.reps[workoutView.currentExercise] -= 1;
    } else {
      model.workout.weight[workoutView.currentExercise] -= 2;
    }
  }
  doneHandler();
}

function lightHandler() {
  if (!Number.isFinite(model.workout.weight[workoutView.currentExercise])) {
    model.workout.reps[workoutView.currentExercise] += 1;
  } else {
    model.workout.weight[workoutView.currentExercise] += 2;
  }
  doneHandler();
}

// USER HANDLERS

function dropdownItemListHandler() {
  document.querySelector(".experience-active-btn").textContent =
    this.textContent;
  document.querySelector(".dropdown-options-list").classList.add("hidden");
  document.querySelector(".dropdown-arrow").classList.toggle("rotate180");
  activeUser.experience = this.dataset.exp;
}

function saveEditProfileHandler() {
  const login = document.querySelector(".reg-login");
  const password = document.querySelector(".reg-password");
  // Validation
  if (login.value !== "") loginValidation();
  if (password.value !== "") changePasswordValidation();
  if (password.value !== "") passwordValidation();
  // Guard clause
  if (document.querySelector(".input-error")) return;
  // Action
  if (login.value !== "") {
    findActiveUserOnArray().login = login.value;
    activeUser.login = login.value;
  }
  if (password.value !== "") {
    findActiveUserOnArray().password = login.password;
    activeUser.password = password.value;
  }
  renderUser();
}

function findActiveUserOnArray() {
  return model.usersList.find((user) => user.login === activeUser.login);
}

function changePasswordValidation() {
  const currentPassword = document.querySelector(".reg-password-current");
  if (currentPassword.value !== activeUser.password) {
    validationError(currentPassword, "Wrong password");
  }
}
function deleteAccHandler() {
  model.usersList.splice(model.usersList.indexOf(activeUser), 1);
  renderLogin();
}

function saveEditParametersHandler() {
  const height = document.querySelector(".reg-height");
  const weight = document.querySelector(".reg-weight");
  const gender = document.querySelector(".radio[name=gender]:checked");
  // Validation
  if (height.value !== "") heightValidation();
  if (weight.value !== "") weightValidation();
  // Guard clause
  if (document.querySelector(".input-error")) return;
  // Gender
  if (gender !== null) {
    activeUser.gender = gender.value;
    findActiveUserOnArray().gender = activeUser.gender;
  }
  // Action
  if (height.value !== "") {
    activeUser.height = height.value;
    findActiveUserOnArray().height = activeUser.height;
  }
  if (weight.value !== "") {
    activeUser.weight = weight.value;
    findActiveUserOnArray().weight = activeUser.weight;
  }
  // BMI recalculation
  if (weight.value !== "" || height.value !== "") {
    activeUser.BMI = (
      activeUser.weight /
      (activeUser.height / 100) ** 2
    ).toFixed(2);
  }
  renderUser();
}
//LOGIN HANDLERS

function loginAction() {
  let login = document.querySelector(".login-login");
  let password = document.querySelector(".login-password");
  model.usersList.forEach((user) => {
    if (user.login === login.value && user.password === password.value) {
      activeUser = user;
      sessionStorage.setItem("activeUser", JSON.stringify(activeUser));
      return renderHome();
    }
  });
  if (activeUser) return;
  login.value = "";
  password.value = "";
  document.querySelector(".error-login-text").classList.remove("hidden");
  document.querySelectorAll(".input").forEach((input) => {
    input.classList.add("input-error");
    input.addEventListener("click", () => {
      input.classList.remove("input-error");
    });
  });
}

// REGISTER HANDLERS

function regSubmitHandler() {
  const login = document.querySelector(".reg-login");
  const password = document.querySelector(".reg-password");
  const height = document.querySelector(".reg-height");
  const weight = document.querySelector(".reg-weight");
  const gender = document.querySelector(".radio[name=gender]:checked");
  const experience = document.querySelector(".radio[name=experience]:checked");
  // Validation
  loginValidation();
  passwordValidation();
  heightValidation();
  weightValidation();
  // Guard clause
  if (document.querySelector(".input-error")) return;
  // New user after validation
  model.usersList.push(
    new model.User(
      login.value,
      password.value,
      height.value,
      weight.value,
      gender.value,
      experience.value
    )
  );
  renderLogin();
}

function validationError(input, text) {
  input.value = "";
  input.classList.add("input-error");
  input.setAttribute("placeholder", `${text}`);
  input.addEventListener("click", () => {
    input.classList.remove("input-error");
    input.setAttribute("placeholder", input.dataset.placeholder);
  });
}

function loginValidation() {
  const login = document.querySelector(".reg-login");
  const loginUniqueBoolean = model.usersList.some((user) => {
    if (user.login === login.value) {
      return true;
    } else return false;
  });
  if (login.value.length < 4 || login.value.length > 8 || loginUniqueBoolean) {
    validationError(login, "Unique name contains 4 - 8 characters");
  }
}

function passwordValidation() {
  const password = document.querySelector(".reg-password");
  if (password.value.length < 4 || password.value.length > 16) {
    validationError(password, "Strong password 4 - 16 characters long");
  }
}

function heightValidation() {
  const height = document.querySelector(".reg-height");
  if (
    height.value.length !== 3 ||
    height.value > 300 ||
    !Number.isInteger(Number(height.value))
  ) {
    validationError(height, "Use centimeters, no special characters");
  }
}

function weightValidation() {
  const weight = document.querySelector(".reg-weight");
  if (
    weight.value.length < 2 ||
    weight.value.length > 3 ||
    weight.value > 250 ||
    weight.value < 30 ||
    !Number.isInteger(Number(weight.value))
  ) {
    validationError(weight, "Use kilograms, no special characters");
  }
}

// History View handlers

function deleteWorkoutHandler(item) {
  item.remove();
  const indexOfElement = activeUser.workoutsHistory.findIndex((element) => {
    return element.index === Number(item.dataset.index);
  });
  activeUser.workoutsHistory.splice(indexOfElement, 1);
  model.storageSaveData();
  renderHistory();
}

function sortWorkoutsHandler() {
  activeUser.workoutsHistory.reverse();

  const btnSort = document.querySelector(".btn-sort");

  if (btnSort.classList.contains("btn-navy")) {
    btnSort.classList.remove("btn-navy");
    btnSort.classList.add("btn-white");
    btnSort.textContent = "Latest";
  } else if (btnSort.classList.contains("btn-white")) {
    btnSort.classList.remove("btn-white");
    btnSort.classList.add("btn-navy");
    btnSort.textContent = "Oldest";
  }
  renderHistory();
}

function sortBtnState() {
  const btnSort = document.querySelector(".btn-sort");
  if (!btnSort) return;
  if (activeUser.workoutsHistory[0].index === 0) {
    btnSort.classList.add("btn-white");
    btnSort.textContent = "Latest";
  } else {
    btnSort.classList.add("btn-navy");
    btnSort.textContent = "Oldest";
  }
}

function dropdownFilterListHandler() {
  // Dropdown control
  document.querySelector(".filter-text").textContent = this.textContent;
  document
    .querySelector(".dropdown-options-list-filter")
    .classList.add("hidden");
  document
    .querySelector(".dropdown-arrow-filter")
    .classList.toggle("rotate180");
  // Filter control
  const filteredArray = [];
  activeUser.workoutsHistory.forEach((element) => {
    if (this.dataset.filter === "all") filteredArray.push(element);
    if (element.bodyPart === this.dataset.filter) filteredArray.push(element);
  });
  // Render new list
  historyView.getDataToRender(filteredArray);
  document.querySelector(".history-list").textContent = "";
  historyView.addHistoryItems();
}
