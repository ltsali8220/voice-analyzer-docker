export const getTop3UniquePhrases = (inputText: string): string[] => {
  const words = inputText.toLowerCase().match(/\b\w+\b/g) || [];

  const wordOccurrences: Record<string, number> = {};

  words.forEach((word) => {
    wordOccurrences[word] = (wordOccurrences[word] || 0) + 1;
  });

  const minFrequency = Math.min(...Object.values(wordOccurrences));

  const uniqueWordsWithMinFreq = Object.keys(wordOccurrences).filter(
    (word) => wordOccurrences[word] === minFrequency,
  );
  return uniqueWordsWithMinFreq.slice(0, 3);
};

export const getFrequencyWord = (input: string) => {
  const words: string[] | null = input.toLowerCase().match(/\b\w+\b/g);
  const frequencyMap: { [key: string]: number } = {};
  let mostFrequent: string = ' ';
  let maxFrequency: number = 0;

  if (words !== null) {
    for (const word of words) {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    }

    for (const word in frequencyMap) {
      if (frequencyMap[word] > maxFrequency) {
        maxFrequency = frequencyMap[word];
        mostFrequent = word;
      }
    }
  }
  return mostFrequent;
};
