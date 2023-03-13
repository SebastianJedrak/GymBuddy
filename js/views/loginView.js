import View from "./view.js";

class LoginView extends View {
  _parentElement = document.querySelector(".main-content");
  _backgroundType = "whitish";
  _navigator = false;
  _headerConfig = [false, false, false, false];
  _HTML() {
    return ` <div class="svg-helloagain"></div>
    <div class="login-register-container">
      <form action="" method="GET" class="form-login">
        <input
          type="text"
          placeholder="Login"
          required="required"
          class="input"
          minlength="4"
          maxlength="16"
        /><input
          type="password"
          placeholder="Password"
          required="required"
          class="input"
          minlength="4"
          maxlength="16"
        />
        <button type="submit" class="btn btn-100 btn-navy">Login</button>
      </form>
      <span><b>or</b></span>
      <button class="btn btn-100 btn-orange">Register</button>
    </div>`;
  }
}

export default new LoginView();
