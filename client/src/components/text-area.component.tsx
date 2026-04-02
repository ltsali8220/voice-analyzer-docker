import { FaVolumeUp } from 'react-icons/fa';

const TextArea = ({ title, children, lang }: { title: string; children: string; lang: string }) => {

  const handlePronounce = () => {
    if (!children) return;
    const langCode = lang.split('-')[0];
    const url = `/api/tts?text=${encodeURIComponent(children)}&lang=${langCode}`;
    const audio = new Audio(url);
    audio.play().catch(console.error);
  };

  return (
    <div className='w-full h-60 overflow-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300'>
      <div className='flex items-center justify-between bg-gray-200 px-3 py-2 mx-2 mt-2 rounded-lg'>
        <h1 className='font-bold'>{title}</h1>
        <button
          onClick={handlePronounce}
          title='Pronounce'
          className='p-1 rounded hover:bg-gray-300 text-gray-600 hover:text-gray-900 disabled:opacity-30'
          disabled={!children}
        >
          <FaVolumeUp size={16} />
        </button>
      </div>
      <div className='p-5'>{children}</div>
    </div>
  );
};

export default TextArea;
