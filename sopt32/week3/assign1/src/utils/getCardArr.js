import img_1 from "../assets/cardImages/1_shin_walk.gif";
import img_10 from "../assets/cardImages/10_shin_confuse.gif";
import img_11 from "../assets/cardImages/11_shin_angry.gif";
import img_12 from "../assets/cardImages/12_shin_frog.gif";
import img_13 from "../assets/cardImages/13_shin_siro.gif";
import img_14 from "../assets/cardImages/14_hima_cry.gif";
import img_15 from "../assets/cardImages/15_siro_sheep.gif";
import img_16 from "../assets/cardImages/16_siro_dance.gif";
import img_17 from "../assets/cardImages/17_masao_cute.gif";
import img_18 from "../assets/cardImages/18_family_bath.gif";
import img_2 from "../assets/cardImages/2_shin_roll.gif";
import img_3 from "../assets/cardImages/3_shin_handstand.gif";
import img_4 from "../assets/cardImages/4_shin_cheek.gif";
import img_5 from "../assets/cardImages/5_shin_ballet.gif";
import img_6 from "../assets/cardImages/6_shin_kiss.gif";
import img_7 from "../assets/cardImages/7_shin_hip.gif";
import img_8 from "../assets/cardImages/8_shin_bike.gif";
import img_9 from "../assets/cardImages/9_shin_spell.gif";

export const allImageArr = [
  img_1,
  img_2,
  img_3,
  img_4,
  img_5,
  img_6,
  img_7,
  img_8,
  img_9,
  img_10,
  img_11,
  img_12,
  img_13,
  img_14,
  img_15,
  img_16,
  img_17,
  img_18,
];

//0부터 totalNum까지의 숫자 중 selectNum개의 랜덤한 숫자 리스트를 반환하는 함수
const getRandomIdx = (totalNum, selectNum) => {
  let randomIndexArray = [];
  for (let i = 0; i < selectNum; i++) {
    //이미 추출된 숫자인지 확인한다
    let randomNum = Math.floor(Math.random() * totalNum);
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      //이미 추출된 숫자라면 다시 뽑는다
      i--;
    }
  }
  return randomIndexArray;
};

//arr 요소들을 두개씩으로 복제하고 랜덤으로 섞는 함수
const makeCardDeck = (array) => {
  array.map((item) => {
    array.push(item); //두개씩 복제
  });
  shuffle(array); //무작위 섞기
  return array;
};

//shuffle 코드 레퍼런스 https://velog.io/@keeper1826/sort%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%85%94%ED%94%8C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90-javaScript
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getCardArr = (level) => {
  let randomIdxArr = [];
  let totalLength = allImageArr.length;
  switch (level) {
    case "easy":
      randomIdxArr = makeCardDeck(getRandomIdx(totalLength, 5));
      return randomIdxArr;
    case "normal":
      randomIdxArr = makeCardDeck(getRandomIdx(totalLength, 7));
      return randomIdxArr;
    case "hard":
      randomIdxArr = makeCardDeck(getRandomIdx(totalLength, 9));
      return randomIdxArr;
    default:
      randomIdxArr = makeCardDeck(getRandomIdx(totalLength, 5));
      return randomIdxArr;
  }
};
