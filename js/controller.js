import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import workoutView from "./views/workoutView.js";
import * as model from "./model.js";

function init() {
  renderHome();
}
init();

function renderHome() {
  homeView.renderView();
  homeView.startListener(workoutView.renderView.bind(workoutView));
}

function renderUser() {
  userView.renderView();
}

function renderHistory() {
  historyView.renderView();
}

function renderWorkout() {
  workoutView.renderView();
}
