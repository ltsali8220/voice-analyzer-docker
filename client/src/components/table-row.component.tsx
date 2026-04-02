import { DataItem } from '@/types/models';
import React from 'react';
import { FaVolumeUp, FaTrash } from 'react-icons/fa';

function speak(text: string, lang: string) {
  if (!text) return;
  const url = `/api/tts?text=${encodeURIComponent(text)}&lang=${lang.split('-')[0]}`;
  const audio = new Audio(url);
  audio.play().catch(console.error);
}

const TableRow: React.FC<{ item: DataItem; index: number; onDelete: (id: number) => void }> = ({ item, index, onDelete }) => {
  const { id, inputText, inputLang, outputText, hindiText } = item;

  return (
    <tr className='odd:bg-white even:bg-gray-50 border-b'>
      <td className='px-4 py-3 text-center text-sm text-gray-600'>{index + 1}</td>

      <td className='px-4 py-3 text-sm text-gray-900'>
        <div className='flex items-start justify-between gap-2'>
          <span>{inputText}</span>
          <button onClick={() => speak(inputText, inputLang)} className='mt-1 shrink-0 text-gray-400 hover:text-blue-600'>
            <FaVolumeUp size={14} />
          </button>
        </div>
      </td>

      <td className='px-4 py-3 text-sm text-gray-900'>
        <div className='flex items-start justify-between gap-2'>
          <span>{outputText}</span>
          <button onClick={() => speak(outputText, 'en')} className='mt-1 shrink-0 text-gray-400 hover:text-blue-600'>
            <FaVolumeUp size={14} />
          </button>
        </div>
      </td>

      <td className='px-4 py-3 text-sm text-gray-900'>
        <div className='flex items-start justify-between gap-2'>
          <span>{hindiText}</span>
          <button onClick={() => speak(hindiText, 'hi')} className='mt-1 shrink-0 text-gray-400 hover:text-blue-600'>
            <FaVolumeUp size={14} />
          </button>
        </div>
      </td>

      <td className='px-4 py-3 text-center'>
        <button
          onClick={() => id !== undefined && onDelete(id)}
          className='text-red-400 hover:text-red-600'
          title='Delete'
        >
          <FaTrash size={14} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
