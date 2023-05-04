import { allImageArr } from "../utils/GetCardArr";
import cardBackImage from "../assets/pageImages/card-back.png";
import styled from "styled-components";

const Card = (props) => {
  const { imgId, clickHandler, compareList, pairedList, pk } = props;

  // 이 카드가 비교되고 있는 카드인지 여부를 체크하여 boolean 값을 반환
  const isComparing = compareList.some((item) => {
    if (item.pk === pk) return true;
  });
  // 이 카드가 이미 짝맞춰진 카드인지 여부를 체크하여 boolean 값을 반환
  const isPaired = pairedList.some((item) => {
    if (item.pk === pk) return true;
  });

  return (
    <StyledCardWrapper>
      <div className="pair">
        <div className={`card ${isComparing || isPaired ? "flipped" : ""}`}>
          <div className="card__front">
            <StyledCard src={allImageArr[imgId]}></StyledCard>
          </div>
          <div className="card__back">
            <StyledCard
              onClick={() => clickHandler(pk, imgId)}
              src={cardBackImage}
            ></StyledCard>
          </div>
        </div>
      </div>
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.article`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .pair {
    width: 13rem;
    height: 12.5rem;
    animation: fadein 0.8s;
  }
  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.8s;
    transform-style: preserve-3d;
  }

  .card__front,
  .card__back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; //요소의 뒷면을 보여줄지를 결정한다
  }

  // 기본적으로 앞면이 먼저 보이도록 뒤집어 놓는다.
  // 요소를 Y축을 기준으로 회전시킨다.
  .card__front {
    transform: rotateY(180deg);
  }

  .card__front > img {
    background-color: ${({ theme }) => theme.colors.white};
  }

  .flipped {
    transform: rotateY(180deg); //앞면과 뒷면을 한번에 뒤집는다
  }
`;

const StyledCard = styled.img`
  border: 0.3rem double ${({ theme }) => theme.colors.black};

  background-color: ${({ theme }) => theme.colors.grey};

  padding: 1.5rem;
  margin: 1rem;

  width: 7rem;

  cursor: pointer;
`;

export default Card;
