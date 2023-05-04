import GlobalStyle from "./styles/globalStyles";
import Main from "./pages/Main";
import { ThemeProvider } from "styled-components";
import backgroundImage from "./assets/pageImages/background.png";
import styled from "styled-components";
import theme from "./styles/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Background>
          <Main />
        </Background>
      </ThemeProvider>
    </>
  );
}

export default App;

const Background = styled.div`
  background-image: url(${backgroundImage});

  height: min-content;
`;
