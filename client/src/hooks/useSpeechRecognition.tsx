import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const useSpeechRecognition = () => {
  const [language, setlanguage] = useState('en-US');
  const [text, setText] = useState('');
  const [isListening, setisListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setText(event.results[event.results.length - 1][0].transcript);
    };

    recognition.onerror = (event: Event) => {
      console.error('Speech error:', (event as SpeechRecognitionErrorEvent).error);
      setisListening(false);
    };

    recognition.onend = () => setisListening(false);

    recognitionRef.current = recognition;
  }, [language]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setText('');
    setisListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    setisListening(false);
    recognitionRef.current.stop();
  };

  return {
    language,
    setlanguage,
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!SpeechRecognition,
  };
};

export default useSpeechRecognition;
