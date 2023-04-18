//select option의 vlaue를 카테고리명으로 변환하기 위한 객체
const CATEGORY_NAME = {
  veg: "채소",
  mush: "버섯",
  tofu: "두부",
  etc: "기타",
};

const imageInput = document.getElementById("image");
const imageThumbNail = document.getElementById("image-thumbnail");
imageInput.addEventListener("input", () => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    imageThumbNail.src = reader.result;
  });
  reader.readAsDataURL(imageInput.files[0]);
});

const form = document.getElementById("add-card-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const hashTags = e.target.hashtag.value.replace(/ /g, "").split(",");
  const category = CATEGORY_NAME[e.target.category.value];

  let localStorageData = JSON.parse(localStorage.getItem("item_data"));
  localStorageData.push({
    category: category,
    name: name,
    tags: hashTags,
    img: imageThumbNail.src,
  });

  localStorage.setItem("item_data", JSON.stringify(localStorageData));

  location.replace("../");
});
