export interface SetupProps {
  selectedDifficulty: string | null;
  setSelectedDifficulty: (value: string) => void;
}

export interface TitleProps {
  text: string;
  selectedDifficulty: string | null;
}

export interface MetricsProps {
  seconds: number;
  moveCount: number;
}

export interface CardsProps {
  shuffledValues: number[];
  firstGuessIndex: number | null;
  secondGuessIndex: number | null;
  setFirstGuessIndex: (value: number | null) => void;
  setSecondGuessIndex: (value: number | null) => void;
  incrementMoveCount: () => void;
  handleReset: () => void;
  matchedCards: number[];
  setMatchedCards: (value: number[] | ((prev: number[]) => number[])) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (value: string) => void;
  gridSize: number;
}

export interface MenuProps {
  handleSetup: () => void;
  handleReset: () => void;
}
