import ITEM_LIST from "../data/item_data.js";

//checkbox의 id를 카테고리명으로 변환하기 위한 객체
const CATEGORY_NAME = {
  "check-all": "전체",
  "check-veg": "채소",
  "check-mush": "버섯",
  "check-tofu": "두부",
  "check-etc": "기타",
};

/*************
nav 체크박스 필터링
**************/

let curItemList = []; //화면에 보여줄 아이템 리스트를 저장하는 변수
let newItemList = []; //localStorage에 저장된 값을 가져오는 변수

const checkBoxAll = document.getElementById("check-all");
//브라우저를 처음 실행할 때 전체 카테고리가 디폴트로 선택
window.onload = () => {
  localStorage.getItem("item_data") === null &&
    localStorage.setItem("item_data", JSON.stringify(ITEM_LIST)); //localStorage에 초기화
  newItemList = JSON.parse(localStorage.getItem("item_data")); //localStorage에 저장된 목록을 가져옴

  document.getElementById("check-all").checked = true; //전체 카테고리는 디폴트로 체크

  curItemList = newItemList;
  listToCard(curItemList);
  makeCategoryTag(checkBoxAll);
  generateModal();
};

const checkBox = document.getElementsByClassName("main__nav__checkbox"); //checkbox에 해당하는 HTMLCollection
const checkBoxList = [...checkBox]; //HTMLCollection to Array

checkBoxList.forEach((item) => {
  //checkbox의 변화를 감지
  item.addEventListener("change", () => {
    curItemList = handleCheckBox(
      item.checked, //감지된 변화가 체크인가, 체크 해제인가
      CATEGORY_NAME[item.id], //변화가 감지된 checkBox의 카테고리명
      curItemList
    );

    listToCard(curItemList); //반환된 list를 Card 노드로 만들어 화면에 보여준다.
    makeCategoryTag(item); //변화가 감지된 checkBox에 대해 카테고리 태그 생성 또는 삭제
    generateModal();
  });
});

//체크박스 체크와 해제(isChecked)에 따라 해당하는 카테고리(categoryName)에 속하는 아이템 목록을 list에 추가하거나 삭제하는 함수
function handleCheckBox(isChecked, categoryName, list) {
  if (categoryName === "전체") {
    isChecked //전체 카테고리 선택 시
      ? newItemList.forEach((item) => {
          //list에 ITEM_LIST의 모든 항목을 넣음
          list.push(item);
          list = Array.from(new Set(list));
        })
      : checkBoxList.forEach((item) => {
          //전체 카테고리 선택 해제 시
          item.checked || //체크박스 목록에서 체크가 안된것은 list에서 제거
            (list = removeByCategoryName(list, CATEGORY_NAME[item.id]));
        });
  } else {
    isChecked //전체가 아닌 다른 카테고리 선택 시
      ? newItemList.forEach((item) => {
          item.category === categoryName && //해당 카테고리에 속하는 item들을 list에 넣음
            (list.push(item), (list = Array.from(new Set(list))));
        })
      : //카테고리 선택 해제 시, 'check-all' 체크박스가 선택이 안되어있는 상태라면
        checkBoxAll.checked || //해당 카테고리에 속하는 item들을 list에서 제거
        (list = removeByCategoryName(list, categoryName));
  }
  return list;
}

//list에서 카테고리명이 categoryName인 아이템을 제거하는 함수
function removeByCategoryName(list, categoryName) {
  list = list.filter((item) => item.category != categoryName);
  return list;
}

/*************
필터링된 데이터 기반으로 화면에 보여주기
**************/

const cardsSection = document.getElementById("cards"); //card들이 들어갈 부모노드
const cardTemplate = document.getElementById("cards__template"); //card 템플릿

//list를 탐색하면서 요소를 하나씩 card 노드로 만드는 함수
function listToCard(list) {
  cardsSection.replaceChildren();
  list.forEach((item) => {
    //tag들 또한 리스트이므로 그 안에서 map을 돌린다.
    let tags = ``;
    item.tags.forEach((tag) => {
      tags += `<small>` + tag + `</small>\n`;
    });

    let content = cardTemplate.cloneNode(true); //템플릿 복사
    let newHtml = content.innerHTML; //템플릿 안의 html 복사
    newHtml = newHtml //복사한 html에서 필요한 부분을 item 내용에 맞게 변경
      .replace("{item_name}", item.name)
      .replace("{tags}", tags)
      .replace("{modal_tags}", tags)
      .replace("{img_alt}", item.name)
      .replace("{img_src}", item.img);

    content.innerHTML = newHtml; //새롭게 바뀐 html을 템플릿에 적용
    cardsSection.appendChild(content.content); //부모노드 안에 넣기
  });
}

/*************
카테고리 태그 관리
**************/

const categoryTagSection = document.getElementById("category-tags__box"); //카테고리 태그들이 들어갈 부모노드
const categoryTagTemplate = document.getElementById("category-tags__template"); //card 템플릿

//checkBox의 checked 상태에 따라 카테고리 태그를 생성하거나 삭제하는 함수
function makeCategoryTag(checkBox) {
  if (checkBox.checked) {
    let content = categoryTagTemplate.cloneNode(true); //템플릿 복사
    let newHtml = content.innerHTML; //템플릿 안의 html 복사
    newHtml = newHtml
      .replace("{category_name}", CATEGORY_NAME[checkBox.id])
      .replace("{checkbox_id}", checkBox.id)
      .replace("{category-tag_id}", "tag__" + checkBox.id);
    content.innerHTML = newHtml;
    categoryTagSection.appendChild(content.content);
  } else {
    const target = document.getElementById("tag__" + checkBox.id);
    target.remove();
  }
}

/*************
해시태그 모달 관리
**************/

function generateModal() {
  const tagPlusBtn = document.getElementsByClassName("tags__plus-btn");
  const tagPlusBtnList = [...tagPlusBtn];
  tagPlusBtnList.forEach((item) => {
    item.addEventListener("click", () => {
      //클릭된 +버튼에 해당하는 modal 잡아오기
      const modal = item.parentNode.parentNode.firstElementChild;
      modal.style.display = "flex";
    });
  });

  const tagCloseBtn = document.getElementsByClassName("tag__close-btn");
  const tagCloseBtnList = [...tagCloseBtn];
  tagCloseBtnList.forEach((item) => {
    item.addEventListener("click", () => {
      //클릭된 +버튼에 해당하는 modal 잡아오기
      const modal = item.parentNode.parentNode;
      modal.style.display = "none";
    });
  });

  //overlay 영역 클릭시 모달 close
  const tagOverlay = document.getElementsByClassName("cards__card__modal");
  const tagOverlayList = [...tagOverlay];
  tagOverlayList.forEach((item) => {
    item.addEventListener("click", () => {
      item.style.display = "none";
    });
  });
}
