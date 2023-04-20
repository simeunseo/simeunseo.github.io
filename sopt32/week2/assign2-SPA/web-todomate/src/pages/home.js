import "../css/home.css";

import { HomeJs } from "../js/home";

function Home($container) {
  HomeJs();

  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
    <div id="home-container">
    <header>
    <h1>web todo mate</h1>
  </header>
  <aside id="add-todo__modal">
    <section id="form__container">
      <i id="close-btn" class="fa-solid fa-x"></i>
      <h2>할 일 추가하기</h2>
      <form id="add-todo__form">
        <input required type="text" name="content" id="add-todo__content" />
        <button type="submit"><h3>추가</h3></button>
      </form>
    </section>
  </aside>
  <main>
    <section>
      <ol id="calendar">
        <li>
          <h3>월</h3>
          <div class="calendar__todo-num">
            <i class="fa-solid fa-heart"></i>
            <small>3</small>
          </div>
          <h3>3</h3>
        </li>
        <li>
          <h3>화</h3>
          <div class="calendar__todo-num">
            <small>8</small>
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3>4</h3>
        </li>
        <li>
          <h3>수</h3>
          <div class="calendar__todo-num">
            <small>6</small>
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3>5</h3>
        </li>
        <li>
          <h3>목</h3>
          <div class="calendar__todo-num">
            <small>0</small>
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3>6</h3>
        </li>
        <li>
          <h3>금</h3>
          <div class="calendar__todo-num">
            <small>2</small>
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3>7</h3>
        </li>
        <li>
          <h3>토</h3>
          <div class="calendar__todo-num selected">
            <small id="today__todoCounting"></small>
            <i class="fa-solid fa-heart selected"></i>
          </div>
          <h3 class="selected">8</h3>
        </li>
        <li>
          <h3>일</h3>
          <div class="calendar__todo-num">
            <small>0</small>
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3>9</h3>
        </li>
      </ol>
    </section>
    <section id="todo"></section>
  </main>
  <footer>
    <a href="/">
      <div id="btn-calendar">
        <i class="fa-solid fa-house"></i>
        <h2>달력</h2>
      </div>
    </a>
    <a href="/mycategory">
      <div id="btn-my">
        <i class="fa-solid fa-circle-user"></i>
        <h2>MY</h2>
      </div>
    </a>
  </footer>

  <template id="todo__template">
    <article>
      <div class="todo__categories__title {bg_color}">
        <h2>{category_name}</h2>
        <i class="fa-solid fa-circle-plus add-btn"></i>
      </div>
      <ul class="todo__categories__content">
        {todos}
      </ul>
    </article>
  </template>

  <template id="todo__list__template">
    <li>
      <i class="done-btn fa-solid fa-heart" done="{done}">
        <input type="button" id="{todo_content}" />
      </i>
      <label for="{todo_content}" category="{category_name}"
        >{todo_content}</label
      >
    </li>
  </template>

  <template id="add-todo__form__template">
    <form category="{category-name}" id="add-todo__form">
      <input required type="text" name="content" id="add-todo__content" />
      <button type="submit"><h3>추가</h3></button>
    </form>
  </template>
  </div>
          `;
  };
  this.render();
}
export default Home;
