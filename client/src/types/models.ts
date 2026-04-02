export type DataItem = {
  id?: number;
  inputText: string;
  inputLang: string;
  outputText: string;
  hindiText: string;
  uniqueWords: string[];
  mostFrequentlyUsedWord: string;
};

export interface HistoryTableProps {
  data: DataItem[];
  onDelete: (id: number) => void;
}

export interface ButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color: string;
}

export interface TextTranslatorProps {
  inputLanguage: string;
  inputText: string;
  data: DataItem[];
  setData: any;
}
