import "../css/home.css";

import { CATEOGORY_COLOR, TODO_DATA } from "../data/todoData";

function Home($container) {
  let todoData = []; //localStorage에 저장된 목록을 가져와 저장하는 배열
  let todoCounting = 0; //미완료 할일의 수

  window.onload = () => {
    localStorage.getItem("todo_data") === null &&
      localStorage.setItem("todo_data", JSON.stringify(TODO_DATA)); //localStorage 초기화
    todoData = JSON.parse(localStorage.getItem("todo_data")); //localStorage에 저장된 목록을 가져옴
    listToTodo(todoData);
    checkDone();
    todoCount();
    checkModal();
  };

  //할일 클릭을 감지하여 처리하는 함수
  function checkDone() {
    let localStorageData = JSON.parse(localStorage.getItem("todo_data")); //변경된 사항을 localStorage에 반영함

    const doneBtn = document.getElementsByClassName("done-btn");
    const doneBtnList = [...doneBtn]; //HTMLCollection to Array

    doneBtnList.forEach((item) => {
      item.addEventListener("click", () => {
        const changedTodo = item.children[0].id; //클릭된 todo 항목의 이름
        const changedCategory =
          item.nextElementSibling.attributes.category.value; //클릭된 todo 항목의 카테고리명
        const doneValue = item.attributes.done.value;
        if (doneValue === "true") {
          //localStorageData에서 카테고리명이 changedCategory이고 항목 이름이 changedTodo인 요소의 done값을 변경한다!
          //사실 item 전부 반복문 돌려서 찾으면 가독성은 더 좋은데, 반복문을 피하려고 하다보니 이렇게 긴 탐색의 과정이 필요했습니다...
          localStorageData
            .find((item) => item.category === changedCategory)
            .list.find((item) => item.content === changedTodo).done = false;
          item.attributes.done.value = "false";
          todoCounting++;
        } else {
          localStorageData
            .find((item) => item.category === changedCategory)
            .list.find((item) => item.content === changedTodo).done = true;
          item.attributes.done.value = "true";
          todoCounting--;
        }
        localStorage.setItem("todo_data", JSON.stringify(localStorageData));
        todoCount();
      });
    });
  }

  //미완료 할일의 수를 표시하는 함수
  function todoCount() {
    const todayTodoCounting = document.getElementById("today__todoCounting");
    todayTodoCounting.innerText = todoCounting;
  }

  //list를 탐색하면서 요소를 하나씩 투두로 만드는 함수
  function listToTodo(list) {
    todoCounting = 0;
    const todoSection = document.getElementById("todo"); //투두리스트가 들어갈 부모노드
    const todoTemplate = document.getElementById("todo__template"); //todo(전체 박스) 템플릿
    todoSection.replaceChildren();
    list.forEach((item) => {
      let todoListNewHtml = listToTodoList(item.list, item.category);

      let todoContent = todoTemplate.cloneNode(true); //템플릿 복사
      let todoNewHtml = todoContent.innerHTML; //템플릿 안의 html 복사

      todoNewHtml = todoNewHtml //복사한 html에서 필요한 부분을 item 내용에 맞게 변경
        .replace("{bg_color}", "bg-" + CATEOGORY_COLOR[item.category])
        .replace("{category_name}", item.category)
        .replace("{todos}", todoListNewHtml);

      todoContent.innerHTML = todoNewHtml; //새롭게 바뀐 html을 템플릿에 적용
      todoSection.appendChild(todoContent.content); //부모노드 안에 넣기
    });
    todoCount();
  }

  function listToTodoList(list, categoryName) {
    const todoListTemplate = document.getElementById("todo__list__template"); //todo list(한 카테고리의 투두 목록들) 템플릿
    let finalHtml = "";
    list.forEach((item) => {
      item.done === false && todoCounting++;
      let todoListContent = todoListTemplate.cloneNode(true);
      let todoListNewHtml = todoListContent.innerHTML;
      todoListNewHtml = todoListNewHtml
        .replace("{done}", item.done)
        .replace("{category_name}", categoryName)
        .replace(/{todo_content}/gi, item.content);
      finalHtml += todoListNewHtml;
    });
    return finalHtml;
  }

  let curModalFor = null;
  //modal의 열고 닫힘을 관리하는 함수
  function checkModal() {
    const modal = document.getElementById("add-todo__modal");
    const addBtn = document.getElementsByClassName("add-btn");
    const addBtnList = [...addBtn];

    addBtnList.forEach((item) => {
      item.addEventListener("click", (e) => {
        modal.style.display = "block"; //+버튼 클릭시 모달 보이기
        document.getElementById("add-todo__content").focus();
        curModalFor = item.previousElementSibling.innerHTML;
      });
    });

    curModalFor || resolveModal(modal);

    const closeBtn = document.getElementById("close-btn");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      curModalFor = null;
    });
  }

  //modal 안에서 일어나는 인터랙션을 관리하는 함수
  function resolveModal(modal) {
    let formInput = "";
    const form = document.getElementById("add-todo__form");
    //form이 제출됐을 때
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      //사용자 입력값을 formInput에 저장
      formInput = document.getElementById("add-todo__content").value;
      let localStorageData = JSON.parse(localStorage.getItem("todo_data"));
      let contentList = localStorageData.find(
        (item) => item.category === curModalFor
      ).list;
      let isExist = false;
      contentList.forEach((item) => {
        item.content === formInput && (isExist = true);
      });
      if (isExist) {
        alert(
          "[" +
            curModalFor +
            "] 카테고리에 '" +
            formInput +
            "' 항목이 이미 존재해요!"
        );
      } else {
        contentList.push({
          content: formInput,
          done: false,
        });

        localStorage.setItem("todo_data", JSON.stringify(localStorageData));
        todoCounting++;
        todoData = JSON.parse(localStorage.getItem("todo_data"));
        listToTodo(todoData);
        checkDone();
        checkModal();
      }
      modal.style.display = "none";
      document.getElementById("add-todo__content").value = "";
      curModalFor = null;
    });
  }

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
