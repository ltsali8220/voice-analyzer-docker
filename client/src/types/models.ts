export type DataItem = {
  inputText: string;
  outputText: string;
  uniqueWords: string[];
  mostFrequentlyUsedWord: string;
};

export interface HistoryTableProps {
  data: DataItem[];
}

export interface ButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color: string
}

export interface TextTranslatorProps {
  inputLanguage: string;
  inputText: string;
  data: DataItem[];
  setData: any;
}