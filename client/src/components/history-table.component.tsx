import { DataItem } from '@/types';

const HistoryTable = ({ data }: any) => {
  return (
    <div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg m-10'>
        <div>
          {' '}
          <title className='text-black'> History </title>
        </div>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs border-solid border-2 text-gray-700 uppercase dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                Sn.No.
              </th>
              <th scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                Input Text
              </th>
              <th scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                Translated Text
              </th>
              <th scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                Most Frequently Used Words
              </th>
              <th scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                Unique Words
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: DataItem, index: number) => {
              return (
                <tr className='odd:bg-white even:bg-white  border-b '>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center text-sm'
                  >
                    {index + 1}
                  </th>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center text-sm'
                  >
                    {item.inputText}
                  </th>
                  <td className='px-6 py-4 text-gray-600 text-center text-sm'>{item.outputText}</td>
                  <td className='px-6 py-4 text-gray-600 text-center text-sm'>
                    {item.mostFrequentlyUsedWord}
                  </td>
                  <td className='px-6 py-4 text-gray-600 text-center text-sm'>
                    {item.uniqueWords.join(', ')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
