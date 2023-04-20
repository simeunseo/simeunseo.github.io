import "../css/mycategory.css";

import { mycategoryJs } from "../js/mycategory";

function MyCategory($container) {
  mycategoryJs();

  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
    <div id="mycategory-container">
    <header>
      <h1>web todo mate</h1>
    </header>

    <main>
      <h2>카테고리 순서 변경</h2>
      <section id="order-change__section"></section>
    </main>
    <footer>
      <a href="./">
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

    <template id="categories__template">
      <div
        id="{category_name}"
        class="todo__categories__title bounce {bg_color}"
        draggable="true"
      >
        <h2>{category_name}</h2>
      </div>
    </template>
    </div>
          `;
  };
  this.render();
}
export default MyCategory;
