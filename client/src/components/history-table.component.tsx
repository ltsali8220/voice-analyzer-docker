import { DefaultColumnsName as columns } from '@/constant';
import { DataItem, HistoryTableProps } from '@/types/models';
import TableRow from './table-row.component';

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
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
              {columns.map((columnName: string, index:number) => (
                  <th key={index} scope='col' className='px-6 py-3 text-center bg-gray-700 text-white text-lg'>
                    {columnName}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((item: DataItem, index: number) => (
              <TableRow key={index} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
