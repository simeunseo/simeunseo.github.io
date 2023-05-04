import Cards from "../components/Cards";
import { GlobalContextProvider } from "../context/context";
import Header from "../components/Header";
import { useState } from "react";

const Main = () => {
  const [compareList, setCompareList] = useState([]); // 비교 대상인 카드의 {pk, imgId}를 저장
  const [pairedList, setPairedList] = useState([]); // 짝을 맞춘 카드의 {pk, imgId}를 저장
  const [cardAllList, setCardAllList] = useState([]); // 화면에 보여지는 카드 리스트(imgId 목록)를 저장

  return (
    <GlobalContextProvider>
      <Header
        compareList={compareList}
        setCompareList={setCompareList}
        pairedList={pairedList}
        setPairedList={setPairedList}
        setCardAllList={setCardAllList}
      />
      <Cards
        compareList={compareList}
        setCompareList={setCompareList}
        pairedList={pairedList}
        setPairedList={setPairedList}
        cardAllList={cardAllList}
        setCardAllList={setCardAllList}
      />
    </GlobalContextProvider>
  );
};

export default Main;
