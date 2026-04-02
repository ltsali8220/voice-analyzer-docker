import { DefaultColumnsName as columns } from '@/constant';
import { DataItem, HistoryTableProps } from '@/types/models';
import TableRow from './table-row.component';

const HistoryTable: React.FC<HistoryTableProps> = ({ data, onDelete }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg m-10'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-white uppercase bg-gray-700'>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className='px-4 py-3 text-center'>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: DataItem, index: number) => (
            <TableRow key={item.id ?? index} item={item} index={index} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
