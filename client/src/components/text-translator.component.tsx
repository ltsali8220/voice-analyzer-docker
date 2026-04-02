import { useEffect, useState } from 'react';
import HistoryTable from './history-table.component';
import { getFrequencyWord, getTop3UniquePhrases } from '@/utils';
import { saveTranscribeData, deleteTranscribeData } from '@/services/api.serivces';
import TextArea from './text-area.component';
import { TextTranslatorProps } from '@/types/models';

const INPUT_TOOLS_MAP: Record<string, string> = {
  'ta-IN': 'ta-t-i0-und',
  'hi-IN': 'hi-t-i0-und',
  'te-IN': 'te-t-i0-und',
  'ml-IN': 'ml-t-i0-und',
  'kn-IN': 'kn-t-i0-und',
};

function isRomanized(text: string): boolean {
  return /^[\x00-\x7F\s]+$/.test(text);
}

async function toNativeScript(text: string, lang: string): Promise<string> {
  const itc = INPUT_TOOLS_MAP[lang];
  if (!itc || !isRomanized(text)) return text;
  try {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${itc}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`;
    const res = await fetch(url);
    const json = await res.json();
    if (json[0] === 'SUCCESS' && json[1]?.[0]?.[1]?.[0]) return json[1][0][1][0];
  } catch { /* fall through */ }
  return text;
}

async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  if (!text) return '';
  const fromCode = fromLang.split('-')[0];
  const toCode = toLang.split('-')[0];
  if (fromCode === toCode) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromCode}&tl=${toCode}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const json = await res.json();
    return json[0].map((item: any) => item[0]).join('');
  } catch { return text; }
}

const TextTranslator: React.FC<TextTranslatorProps> = ({ inputLanguage, inputText, data, setData }) => {
  const [loader, setLoader] = useState(false);
  const [nativeText, setNativeText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [hindiText, setHindiText] = useState('');

  useEffect(() => {
    if (!inputText) return;
    toNativeScript(inputText, inputLanguage).then(native => {
      setNativeText(native);
      translateText(native, inputLanguage, 'en-US').then(setEnglishText);
      translateText(native, inputLanguage, 'hi-IN').then(setHindiText);
    });
  }, [inputText, inputLanguage]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const payload = {
        inputText: nativeText || inputText,
        inputLang: inputLanguage.split('-')[0],
        outputText: englishText,
        hindiText: hindiText,
        mostFrequentlyUsedWord: getFrequencyWord(englishText),
        uniqueWords: getTop3UniquePhrases(englishText),
      };
      const responseData = await saveTranscribeData(payload);
      setData(responseData);
    } catch (error) {
      console.error('Failed to save', error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const responseData = await deleteTranscribeData(id);
      setData(responseData);
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  return (
    <div className='mt-10'>
      <div className='flex gap-6 px-10 pt-6'>
        <div className='w-1/3'>
          <TextArea title='Input' children={nativeText || inputText} lang={inputLanguage} />
        </div>
        <div className='w-1/3'>
          <TextArea title='English' children={englishText} lang='en-US' />
        </div>
        <div className='w-1/3'>
          <TextArea title='Hindi' children={hindiText} lang='hi-IN' />
        </div>
      </div>
      <div className='flex items-center justify-center m-4'>
        <button
          onClick={handleSubmit}
          className='border-2 hover:bg-green-300 w-1/3 p-1 rounded-lg bg-green-400'
        >
          {loader ? 'Saving...' : 'Save'}
        </button>
      </div>
      {data && <HistoryTable data={data} onDelete={handleDelete} />}
    </div>
  );
};

export default TextTranslator;
