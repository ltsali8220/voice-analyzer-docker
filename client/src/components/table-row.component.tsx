import { DataItem } from '@/types/models';
import React from 'react'

const TableRow: React.FC<{ item: DataItem; index: number }> = ({ item, index }) => {
    const { inputText, outputText, mostFrequentlyUsedWord, uniqueWords } = item;
  
    return (
      <tr className='odd:bg-white even:bg-white border-b'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center text-sm'>
          {index + 1}
        </th>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 text-center text-sm'>
          {inputText}
        </th>
        <td className='px-6 py-4 text-gray-600 text-center text-sm'>{outputText}</td>
        <td className='px-6 py-4 text-gray-600 text-center text-sm'>{mostFrequentlyUsedWord}</td>
        <td className='px-6 py-4 text-gray-600 text-center text-sm'>{uniqueWords.join(', ')}</td>
      </tr>
    );
  };

export default TableRow