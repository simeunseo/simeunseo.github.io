import { createContext, useReducer } from "react";

const initialLevel = "easy";
const initialScore = 0;

export const LevelContext = createContext();
export const LevelDispatchContext = createContext();

export const ScoreContext = createContext();
export const ScoreDispatchContext = createContext();

function levelReducer(state, action) {
  switch (action.type) {
    //TODO : 대문자로 컨벤션 맞춰보기?!
    case "easy":
      return "easy";
    case "normal":
      return "normal";
    case "hard":
      return "hard";
    default:
      throw new Error(`Unkown action type: ${action.type}`);
  }
}

function scoreReducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "INITIALIZE":
      return 0;
  }
}

export function GlobalContextProvider({ children }) {
  const [level, levelDispatch] = useReducer(levelReducer, initialLevel);
  const [score, scoreDispatch] = useReducer(scoreReducer, initialScore);
  return (
    <LevelContext.Provider value={level}>
      <LevelDispatchContext.Provider value={levelDispatch}>
        <ScoreContext.Provider value={score}>
          <ScoreDispatchContext.Provider value={scoreDispatch}>
            {children}
          </ScoreDispatchContext.Provider>
        </ScoreContext.Provider>
      </LevelDispatchContext.Provider>
    </LevelContext.Provider>
  );
}
