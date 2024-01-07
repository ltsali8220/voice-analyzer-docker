const FrequencyHistoryTable = ({ data }: any) => {
  return (
    <div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-10'>
        <div>
          {' '}
          <title className='text-black'> History </title>
        </div>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs border-solid border-2 text-gray-700 uppercase dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                Sn.no.
              </th>
              <th scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                Most Frequently Used Words
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: number) => {
              return (
                <tr key={index} className='odd:bg-white even:bg-white  border-b'>
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
                    {item.mostFrequentlyUsedWord}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrequencyHistoryTable;
