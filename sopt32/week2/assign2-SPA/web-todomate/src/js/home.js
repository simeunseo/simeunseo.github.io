import { CATEOGORY_COLOR, TODO_DATA } from "../data/todoData";

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
      const changedCategory = item.nextElementSibling.attributes.category.value; //클릭된 todo 항목의 카테고리명
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
