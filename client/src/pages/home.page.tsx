import Button from '@/components/button.component';
import ErrorComponent from '@/components/error-message.component';
import LanguageSelector from '@/components/language-selector.component';
import TextTranslator from '@/components/text-translator.component';
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
      const fetchedData = await getTranscribedHistory();
      setData(fetchedData);
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
          <div>
            <div className='flex items-center justify-center gap-10'>
              <LanguageSelector
                onLanguageChange={onhandleChangeInput}
              />
              <div className='flex gap-5 mt-10'>
                <Button 
                  title = "Start Recording"
                  onClick = {startListening}
                  color = "blue"
                />
                <Button 
                  title = "Stop Recording"
                  onClick = {stopListening}
                  color = "red"
                />
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
          </div>
        ) : (
          <ErrorComponent>
            <h1>Your browser has no speech recognition</h1>
          </ErrorComponent>
        )}
      </div>
    </>
  );
}

export default Home;
