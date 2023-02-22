import homeView from "./views/homeView.js";
import userView from "./views/userView.js";
import historyView from "./views/historyView.js";
import workoutView from "./views/workoutView.js";
import navigatorView from "./views/navigatorView.js";
import * as model from "./model.js";

function init() {
  renderHome();
  navStart();
}
init();

function renderHome() {
  homeView.renderView();
  navStart();
  homeView.startListener(renderWorkout.bind(workoutView));
}

function renderUser() {
  userView.renderView();
  navStart();
}

function renderHistory() {
  historyView.renderView();
  navStart();
}

function renderWorkout() {
  workoutView.renderView();
}

function navStart() {
  navigatorView.userListener(renderUser);
  navigatorView.homeListener(renderHome);
  navigatorView.historyListener(renderHistory);
}
