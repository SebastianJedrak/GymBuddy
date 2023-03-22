import View from "./view.js";

class WorkoutView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "gradient";
  _headerConfig = [false, false, false];
  _HTML() {
    return `<div class="start-svg"></div>`;
  }

  fadeOutTimer() {
    
  }
}

export default new WorkoutView();
