import Buttons from "./Buttons";
import headerImage from "../assets/pageImages/header.png";
import styled from "styled-components";

const Header = (props) => {
  const { setCompareList, setPairedList, cardAllList, setCardAllList } = props;
  return (
    <>
      <HeaderContainer src={headerImage}></HeaderContainer>
      <Buttons
        setCompareList={setCompareList}
        setPairedList={setPairedList}
        cardAllList={cardAllList}
        setCardAllList={setCardAllList}
      ></Buttons>
    </>
  );
};

export default Header;

const HeaderContainer = styled.img`
  width: 100vw;
  text-align: center;

  border-bottom: 0.3rem double ${({ theme }) => theme.colors.black};
`;
