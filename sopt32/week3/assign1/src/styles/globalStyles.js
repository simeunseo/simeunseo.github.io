import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};

    *{
        @font-face {
            font-family: "DOSSaemmul";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSSaemmul.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
          
          * {
            font-family: "DOSSaemmul";
          }
          
    }
    
`;

export default GlobalStyle;
