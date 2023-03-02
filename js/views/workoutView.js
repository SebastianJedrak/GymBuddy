import View from "./view.js";

class WorkoutView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "whitish";
  _headerConfig = [`Workout`, true, true];
  currentExercise = 0;
  currentSet = 1;
  progress = 0;

  _HTML() {
    return `        <div class="workout-wrapper">
  <h3 class="timer-text">Time: 00:16:32</h3>
  <div class="progress-bar"></div>
  <div class="modal-wrapper">
  <dialog class="modal">
  <div class="modal-content-wrapper">
  <h2>Instruction</h2>
  <p class="instruction-content">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Quibusdam excepturi delectus odio dicta minima provident, rem
    tempora eius deleniti consequatur culpa. Aspernatur illum eligendi
    vel eius voluptatum aut placeat officia.
  </p>
  <h3>Equipment</h3>
  <img src="src/eq/band.jpg" class="eq-img"></img>
  <button class="btn btn-33 btn-orange btn-close-modal">Got it!</button>
  </div>
</dialog>
</div>
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
    <button class="btn btn-50 btn-red btn-heavy"><span>Too heavy...</span></button>
    <button class="btn btn-50 btn-green btn-light"><span>Too light!</span></button>
  </div>
  <button class="btn btn-100 btn-white btn-skip">
    Skip to: ${this._data.exercises[this.currentExercise + 1]?.name || "End"}
  </button>
</div>`;
  }

  _infoModalHTML() {
    return ``;
  }

  progressBar() {
    const sumSets = this._data.sets.reduce((acc, element) => {
      return (acc += element);
    }, 0);
    this.progress += (1 / sumSets) * 100;
    let bar = String(this.progress + "%");
    document.documentElement.style.setProperty("--barWidth", bar);
  }

  backListener(handler) {
    document.querySelector(".back-button").addEventListener("click", handler);
  }

  doneListener(handler) {
    document.querySelector(".btn-done").addEventListener("click", handler);
  }

  skipToListener(handler) {
    document.querySelector(".btn-skip").addEventListener("click", handler);
  }

  heavyListener(handler) {
    document.querySelector(".btn-heavy").addEventListener("click", handler);
  }

  lightListener(handler) {
    document.querySelector(".btn-light").addEventListener("click", handler);
  }

  openInfoModalListener() {
    document
      .querySelector(".instruct-svg-container")
      .addEventListener("click", function () {
        document.querySelector(".modal").showModal();
      });
    document
      .querySelector(".btn-close-modal")
      .addEventListener("click", function () {
        document.querySelector(".modal").close();
      });
  }
}

export default new WorkoutView();
