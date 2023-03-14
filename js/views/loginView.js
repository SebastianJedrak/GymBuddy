import View from "./view.js";

class LoginView extends View {
  _parentElement = document.querySelector(".main-content");
  _backgroundType = "whitish";
  _navigator = false;
  _headerConfig = [false, false, false, false];
  _HTML() {
    return ` 
    <div class="svg-login-register-container">
    <div class="svg-helloagain"></div>
    <div class="login-register-container">
    <p class="error-login-text hidden">Login and/or password are incorrect. Please try again.</p>
      <form action="" method="GET" class="form-login">
        <input
          type="text"
          placeholder="Login"
          required="required"
          class="input login-login"
          minlength="4"
          maxlength="16"
        /><input
          type="password"
          placeholder="Password"
          required="required"
          class="input login-password"
          minlength="4"
          maxlength="16"
        />
        <button class="btn btn-100 btn-navy login-submit-btn">Login</button>
      </form>
      <p class="login-or"><b>or</b></p>
      <button class="btn btn-100 btn-orange btn-register">Registration</button>
    </div> </div>`;
  }
  submitAction(handler) {
    document
      .querySelector(".login-submit-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        handler();
      });
  }

  registerBtnListener (handler) {
    document.querySelector(".btn-register").addEventListener("click", handler)
  }
}

export default new LoginView();
