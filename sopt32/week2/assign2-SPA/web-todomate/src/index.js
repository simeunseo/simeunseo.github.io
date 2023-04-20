// 애플리케이션의 시작점 (App을 생성)
import App from "./App";

window.addEventListener("DOMContentLoaded", () => {
  new App(document.querySelector("#app"));
});
