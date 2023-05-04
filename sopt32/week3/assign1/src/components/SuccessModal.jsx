import styled from "styled-components";

const SuccessModal = ({ onClose }) => {
  return (
    <CardWrapper>
      <aside className="modal">
        <section className="modal__content">
          <p className="modal__text">오호이~ 전부 맞추셨네요!</p>
          <div className="modal__close-btn">
            <button type="button" onClick={onClose}>
              돌아가기
            </button>
          </div>
        </section>
      </aside>
    </CardWrapper>
  );
};
export default SuccessModal;

const CardWrapper = styled.div`
  width: 100vw;
  height: 100%;
  background: ${({ theme }) => theme.colors.overlay};
  position: absolute;
  top: 0;
  left: 0;

  .modal {
    display: flex;
    justify-content: center;
    align-items: center;

    border: 0.3rem double ${({ theme }) => theme.colors.black};

    background-color: ${({ theme }) => theme.colors.lemon};

    width: 25rem;
    height: 14rem;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .modal__text {
    font-size: 1.7rem;
    font-family: "DOSSaemmul"; // globalStyles로 설정해놓은 폰트가 p태그에는 적용되지 않고있음! ㅠㅠ
  }

  .modal__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    height: 100%;
  }

  .modal__close-btn > button {
    padding: 1rem;

    border: 0.3rem double ${({ theme }) => theme.colors.black};

    background-color: ${({ theme }) => theme.colors.grey};
  }

  .modal__close-btn > button:hover {
    border: 0.3rem double ${({ theme }) => theme.colors.grey};

    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.grey};

    cursor: pointer;
  }
`;
