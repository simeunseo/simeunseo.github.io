import "../css/mycategory.css";

import { CATEOGORY_COLOR, TODO_DATA } from "../data/todoData";

function MyCategory($container) {
  let todoData = [];
  let categoryList = [];

  window.onload = () => {
    localStorage.getItem("todo_data") === null &&
      localStorage.setItem("todo_data", JSON.stringify(TODO_DATA)); //localStorage 초기화
    todoData = JSON.parse(localStorage.getItem("todo_data")); //localStorage에 저장된 목록을 가져옴

    makeCategories(extractCategoryName(todoData));
  };

  function makeCategories(list) {
    const section = document.getElementById("order-change__section");
    const categoriesTemplate = document.getElementById("categories__template");

    section.replaceChildren();
    list.forEach((category) => {
      let content = categoriesTemplate.cloneNode(true);
      let newHtml = content.innerHTML;

      newHtml = newHtml
        .replace("{bg_color}", "bg-" + CATEOGORY_COLOR[category])
        .replace(/{category_name}/gi, category);

      content.innerHTML = newHtml;
      section.appendChild(content.content);

      const categoryItem = document.getElementById(category);
      resolveDragDrop(categoryItem, section);
    });
  }

  function extractCategoryName(list) {
    list.forEach((item) => {
      categoryList.push(item.category);
    });
    return categoryList;
  }

  function resolveDragDrop(item, parent) {
    item.ondragstart = (e) => {
      e.dataTransfer.setData("id", e.target.id);
    };
    item.ondragover = (e) => {
      e.preventDefault();
    };
    item.ondrop = (e) => {
      const id = e.dataTransfer.getData("id");
      const draggedItem = document.getElementById(id);
      let dropZone = e.target;
      dropZone.tagName === "H2" && (dropZone = dropZone.parentElement);

      categoryList =
        categoryList.indexOf(draggedItem.id) < categoryList.indexOf(dropZone.id)
          ? arrayInsertAfter(categoryList, draggedItem.id, dropZone.id) //draggedItem이 dropZone보다 앞에 있었던 거라면 dropZone의 뒤로 옮긴다.
          : arrayInsertBefore(categoryList, draggedItem.id, dropZone.id); //draggedItem이 dropZone보다 뒤에 있었던 거라면 dropZone의 앞으로 옮긴다.

      makeCategories(categoryList);
      changeLocalStorage(categoryList);
      e.dataTransfer.clearData();
    };
  }

  //array에서 target value를 reference value의 바로 뒤로 순서를 옮기는 함수
  function arrayInsertAfter(array, target, reference) {
    const targetIdx = array.indexOf(target.toString());
    array.splice(targetIdx, 1);
    const referenceIdx = array.indexOf(reference.toString());
    array.splice(referenceIdx + 1, 0, target);
    return array;
  }

  //array에서 target value를 reference value의 바로 앞으로 순서를 옮기는 함수
  function arrayInsertBefore(array, target, reference) {
    const targetIdx = array.indexOf(target.toString());
    array.splice(targetIdx, 1);
    let referenceIdx = array.indexOf(reference.toString());
    referenceIdx || (referenceIdx = 0);
    array.splice(referenceIdx, 0, target);
    return array;
  }

  //변경된 categoryList(순서)에 따라 전체 데이터를 재배치하여 localStorage에 반영하는 함수
  function changeLocalStorage(list) {
    let newData = []; //재배치된 데이터를 저장할 변수
    let localStorageData = JSON.parse(localStorage.getItem("todo_data")); //기존 localStorage 데이터
    list.forEach((category) => {
      let filteredItem = localStorageData.filter(
        (item) => item.category === category
      )[0];
      newData.push({
        category: filteredItem.category,
        list: filteredItem.list,
      });
    });
    localStorage.setItem("todo_data", JSON.stringify(newData));
  }

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
