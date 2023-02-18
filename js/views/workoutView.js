import { clear } from "../helpers.js";

const main = document.querySelector(".main-content");

class workoutView {
  renderWorkout() {
    clear(main);
    main.insertAdjacentHTML("afterbegin", "<span>workout</span>");
  }
}

export default new workoutView();
