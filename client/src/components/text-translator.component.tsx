import { useEffect, useState } from 'react';
import HistoryTable from './history-table.component';
import { getFrequencyWord, getTop3UniquePhrases } from '@/utils';
import { saveTranscribeData } from '@/services/api.serivces';

const TextTranslator = ({ inputLanguage, inputText, data, setData }: any) => {

  const [loader, setLoader] = useState<boolean>(false);
  const [outputText, setoutputText] = useState<string>('');
  const uniquePhrase = getTop3UniquePhrases(outputText);
  const frequencyWord = getFrequencyWord(outputText);
  console.log(inputText);

  useEffect(() => {
    function TranslatedText() {
      const maxChunkLength = 1000; // Define the maximum length of each chunk

      // Split the input text into chunks
      const textChunks = [];
      for (let i = 0; i < inputText.length; i += maxChunkLength) {
        textChunks.push(inputText.substr(i, maxChunkLength));
      }

      // Translate each chunk and store promises in an array
      const translationPromises = textChunks.map(chunk => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=en-US&dt=t&q=${encodeURI(chunk)}`;

        return fetch(url)
          .then(response => response.json())
          .then(json => json[0].map((item:any) => item[0]).join(''));
      });
      
      Promise.all(translationPromises)
        .then(translations => {
          const translatedText = translations.join(' ');
          setoutputText(translatedText);
        })
        .catch(error => {
          console.error("Translation error:", error);
        });
    }
    TranslatedText();
  }, [inputText]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    try {
      const data = {
        inputText: inputText,
        outputText: outputText,
        mostFrequentlyUsedWord: frequencyWord,
        uniqueWords: uniquePhrase,
      };
      const responseData = await saveTranscribeData(data);
      setData(responseData);
      setLoader(false);
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  return (
    <div className='mt-10'>
      <div className='flex gap-10 p-10'>
        <div className='border-2 w-1/2 h-60 overflow-auto rounded-lg text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
          <h1 className='font-bold pl-2 mt-2 border-2 border-solid bg-gray-200 p-2 w-[100px] ml-2 rounded-lg'>
            {' '}
            Input Text{' '}
          </h1>
          <div className='p-5 rounded-lg '> {inputText}</div>
        </div>
        <div className='border-2 w-1/2 h-60 overflow-auto rounded-lg text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
          <h1 className='font-bold pl-2 mt-2 border-2 border-solid bg-gray-200 p-2 w-[120px] ml-2 rounded-lg'>
            {' '}
            Translated Text{' '}
          </h1>
          <div className='p-5'>{outputText}</div>
        </div>
      </div>
      <div className='flex items-center justify-center m-2'>
        <button
          onClick={handleSubmit}
          className='border-2 hover:bg-green-300 w-1/3 p-1 rounded-lg bg-green-400'
        >
          {loader ? <>Saving</> : <>Save </>}
        </button>
      </div>
      {data && (
        <>
          <div>
            <HistoryTable data={data} />
          </div>
        </>
      )}
      <div></div>
    </div>
  );
};

export default TextTranslator;
