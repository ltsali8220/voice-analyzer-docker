import { useState } from 'react';

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const useSpeechRecognition = () => {
  const [language, setlanguage] = useState('');

  const recognitionInstance = new SpeechRecognition();
  recognitionInstance.continuous = true;
  recognitionInstance.lang = language;
  recognitionInstance.interimResults = false;
  recognitionInstance.maxAlternatives = 1;

  const [text, setText] = useState('');
  const [isListening, setisListening] = useState(false);

  if (!recognitionInstance) {
    return;
  }

  recognitionInstance.onresult = async (event: SpeechRecognitionEvent) => {
    setText(event.results[0][0].transcript);
  };

  recognitionInstance.onerror = (event: Event) => {
    console.error('Speech recognition error:', (event as SpeechRecognitionErrorEvent).error);
  };

  const startListening = () => {
    setText('');
    setisListening(true);
    recognitionInstance.start();
  };

  const stopListening = () => {
    setisListening(false);
    recognitionInstance.stop();
  };

  return {
    language,
    setlanguage,
    text,
    isListening,
    startListening,
    setisListening,
    stopListening,
    hasRecognitionSupport: !!recognitionInstance,
  };
};

export default useSpeechRecognition;
