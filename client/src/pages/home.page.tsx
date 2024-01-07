import TextTranslator from '@/components/text-translator.component';
import { LANGUAGES } from '@/constant';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import { getTranscribedHistory } from '@/services/api.serivces';
import { useEffect, useState } from 'react';
import { AiOutlineAudio } from 'react-icons/ai';

function Home() {
  
  const {
    language,
    setlanguage,
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  }: any = useSpeechRecognition();

  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetcheddata = await getTranscribedHistory();
      setData(fetcheddata);
    };
    fetchData();
  }, []);

  const onhandleChangeInput = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setlanguage(e.target.value);
    console.log(language);
  };

  return (
    <>
      <div className='p-5'>
        {hasRecognitionSupport ? (
          <>
            <div className='flex items-center justify-center gap-10'>
              <div className='flex gap-5'>
                <div className='flex flex-col mb-2'>
                  <label htmlFor='' className='text-lg p-2'>
                    {' '}
                    Input Language{' '}
                  </label>
                  <select
                    name=''
                    id=''
                    className='border border-5 rounded-lg p-2'
                    onChange={(event) => onhandleChangeInput(event)}
                  >
                    {LANGUAGES &&
                      LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='flex gap-5 mt-10'>
                <div>
                  <button
                    className='border-2 p-2 rounded-lg bg-blue-400 hover:bg-blue-500 hover:text-white'
                    onClick={startListening}
                  >
                    {' '}
                    Start Recording{' '}
                  </button>
                </div>
                <div>
                  <button
                    className='border-2 p-2 rounded-lg bg-red-400 hover:bg-red-500 hover:text-white'
                    onClick={stopListening}
                  >
                    {' '}
                    Stop Recording{' '}
                  </button>
                </div>
              </div>
            </div>
            {isListening && (
              <div className='flex items-center mt-2 rounded-md justify-center'>
                <AiOutlineAudio />
                <span className='ml-2'>Browser is listening .....</span>
              </div>
            )}
            <TextTranslator
              inputText={text}
              inputLanguage={language}
              data={data}
              setData={setData}
            />
          </>
        ) : (
          <h1>Your browser has no speech recognition</h1>
        )}
      </div>
    </>
  );
}

export default Home;
