import View from "./view.js";

class WorkoutView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "whitish";
  _renderHTML = `workout`;
}

export default new WorkoutView();
