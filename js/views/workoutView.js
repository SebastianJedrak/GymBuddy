import View from "./view.js";

class WorkoutView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "whitish";
  _headerConfig = [`Workout`, true, true];
  currentExercise = 0;
  currentSet = 1;

  _HTML() {
    return `        <div class="workout-wrapper">
  <h3 class="timer-text">Time: 00:16:32</h3>
  <div class="progress-bar"></div>
  <div class="workout-card-container">
    <div class="exercise-YT-container">
      <h2 class="exercise-name-text">
      ${this._data.exercises[this.currentExercise].name}
      </h2>
      <div class="instruct-svg-container"></div>
    </div>
    <p class="muscle-text">${
      this._data.exercises[this.currentExercise].muscle
    }</p>
    <h4 class="set-text">set ${this.currentSet}/${
      this._data.sets[this.currentExercise]
    }</h4>
    <div class="reps-weight-container">
      <div class="reps-container">
        <h3 class="reps-weight-text">reps</h3>
        <h2>${this._data.reps[this.currentExercise]}</h2>
      </div>
      <div class="weight-container">
        <h3 class="reps-weight-text">weight</h3>
        <h2>${this._data.weight[this.currentExercise]}</h2>
      </div>
    </div>
    <button class="btn btn-100 btn-orange btn-done">Done</button>
  </div>
  <div class="red-green-btn-container">
    <button class="btn btn-50 btn-red"><span>Too heavy...</span></button>
    <button class="btn btn-50 btn-green"><span>Too light!</span></button>
  </div>
  <button class="btn btn-100 btn-white">
    <span>Skip to: Bicep Curl</span>
  </button>
</div>`;
  }

  backListener(handler) {
    document.querySelector(".back-button").addEventListener("click", handler);
  }

  doneListener(handler) {
    document.querySelector(".btn-done").addEventListener("click", handler);
  }
}

export default new WorkoutView();
