import View from "./view.js";

class WorkoutView extends View {
  _parentElement = document.querySelector(".main-content");
  _navigator = false;
  _backgroundType = "whitish";
  _renderHTML = `        <div class="workout-wrapper">
  <h3 class="timer-text">Time: 00:16:32</h3>
  <div class="progress-bar"></div>
  <div class="workout-card-container">
    <div class="exercise-YT-container">
      <h2 class="exercise-name-text">Bench press</h2>
      <div class="YT-svg-container"></div>
    </div>
    <p class="muscle-text">biceps</p>
    <h4 class="set-text">set 1/5</h4>
    <div class="reps-weight-container">
      <div class="reps-container">
        <h3 class="reps-weight-text">reps</h3>
        <h2>5</h2>
      </div>
      <div class="weight-container">
        <h3 class="reps-weight-text">weight</h3>
        <h2>20</h2>
      </div>
    </div>
    <button class="btn btn-100 btn-orange btn-done">Done</button>
  </div>
  <div class="red-green-btn-container">
    <button class="btn btn-50 btn-red"><span>Too hard...</span></button>
    <button class="btn btn-50 btn-green"><span>Too easy!</span></button>
  </div>
  <button class="btn btn-100 btn-white">
    <span>Replace with: Chest flyes</span>
  </button>
  <button class="btn btn-100 btn-white">
    <span>Skip to: Bicep Curl</span>
  </button>
</div>`;
  _headerConfig = [`Workout`, true, true];
}

export default new WorkoutView();
