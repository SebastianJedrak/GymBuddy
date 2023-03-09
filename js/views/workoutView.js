import View from "./view.js";

class WorkoutView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "whitish";
  _headerConfig = [`Workout`, true, false];
  currentExercise = 0;
  currentSet = 1;
  progress = 0;

  _HTML() {
    return `        <div class="workout-wrapper">
  <div class="progress-bar"></div>
  <dialog class="modal modal-exit-workout modal-white">
  <div class="modal-content-wrapper">
    <h2>Exit</h2>
    <p class="exit-workout-content">
      Do you really want to abandon your workout? Progress will not be
      saved.
    </p>
    <div class="red-green-btn-container">
      <button class="btn btn-50 btn-navy btn-exit-no">
        <span>No</span>
      </button>
      <button class="btn btn-50 btn-white btn-exit-yes">
        <span>Yes</span>
      </button>
    </div>
  </div>
</dialog>
  <dialog class="modal modal-instructions modal-white">
  <div class="modal-content-wrapper">
  <h2>Instruction</h2>
  <p class="instruction-content">
  ${this._data.exercises[this.currentExercise].instructions}
  </p>
  <h3 class="Eq-header">Equipment</h3>
  <p class="instruction-content">${
    this._data.exercises[this.currentExercise].equipment
  }</p>
  <button class="btn btn-50 btn-orange btn-close-modal">Got it!</button>
  </div>
</dialog>
<dialog class="modal modal-trophy modal-navy">
  <div class="modal-content-wrapper">
    <h2 class="modal-trophy-finished">Finished!</h2>
    <div class="trophy"></div>
    <h3 class="modal-trophy-finished">${this._parameters.bodyPart}-body ${
      this._parameters.type
    } workout</h3>
    <h4 class="modal-trophy-finished">Your last sets</h4>
    <ul class="last-set-list">
    </ul>
    <button class="btn btn-33 btn-orange btn-close-trophy-modal">
      Great
    </button>
  </div>
</dialog>
  <div class="workout-card-container">
    <div class="exercise-YT-container">
    <div class="instruct-svg-container"></div>
      <h2 class="exercise-name-text">
      ${this._data.exercises[this.currentExercise].name}
      </h2>
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
  <h4 class="modify-next-set-text">Modify your next set</h4>
  <div class="red-green-btn-container">
    <button class="btn btn-50 btn-red btn-heavy"><span>Lighter...</span></button>
    <button class="btn btn-50 btn-green btn-light"><span>Heavier!</span></button>
  </div>
  <button class="btn btn-100 btn-white btn-skip">
    Skip to: ${this._data.exercises[this.currentExercise + 1]?.name || "End"}
  </button>
</div>`;
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
    const exitModal = document.querySelector(".modal-exit-workout");
    document
      .querySelector(".back-button")
      .addEventListener("click", function () {
        exitModal.showModal();
        document
          .querySelector(".btn-exit-no")
          .addEventListener("click", function () {
            exitModal.close();
          });
        document
          .querySelector(".btn-exit-yes")
          .addEventListener("click", handler);
      });
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
        document.querySelector(".modal-instructions").showModal();
      });
    document
      .querySelector(".btn-close-modal")
      .addEventListener("click", function () {
        document.querySelector(".modal-instructions").close();
      });
  }

  renderEndModal(after) {
    document.querySelector(".modal-trophy").showModal();
    document
      .querySelector(".btn-close-trophy-modal")
      .addEventListener("click", function () {
        document.querySelector(".modal-trophy").close();
        after();
      });
  }

  _selectEqIMG(eq) {
    let html = `<img src="src/eq/${eq}.jpg" class="eq-img"></img>
    `;
    document.querySelector(".Eq-header").insertAdjacentHTML("afterend", html);
  }


  insertToLastSetList() {
    for (let i = 0; i < this._data.exercises.length; i++) {
      let entry = `<li class="trophy-modal-exercise-item"> <b> ${this._data.exercises[i].name} </b> <p class="trophy-modal-exercise-parameters">${this._data.reps[i]} reps ${this._data.weight[i]} kg</p></li> `;
      document
        .querySelector(".last-set-list")
        .insertAdjacentHTML("beforeend", entry);
    }
  }

  _generateImgEq() {
    switch (this._data.exercises[this.currentExercise].equipment) {
      case "body_only":
        break;
      case "cable":
        this._selectEqIMG("cable");
        break;
      case "bands":
        this._selectEqIMG("bands");
        break;
      case "machine":
        this._selectEqIMG("machine");
        break;
      case "other":
        break;
      case "dumbbell":
        this._selectEqIMG("dumbbell");
        break;
      case "barbell":
        this._selectEqIMG("barbell");
        break;
      case "e-z_curl_bar":
        this._selectEqIMG("e-z_curl_bar");
        break;
      case "None":
        break;
      case "kettlebells":
        this._selectEqIMG("kettlebells");
        break;
      case "exercise_ball":
        this._selectEqIMG("exercise_ball");
        break;
    }
  }

  playSoundNext() {
    const audio = new Audio("src/sound/next.mp3");
    audio.volume = 0.1;
    audio.play();
  }

  playSoundFinish() {
    const audio = new Audio("src/sound/finish.mp3");
    audio.volume = 0.3;
    audio.play();
  }
}

export default new WorkoutView();
