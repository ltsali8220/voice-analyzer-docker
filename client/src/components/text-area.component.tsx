
const TextArea = ({title, children}:{title:string, children:string}) => {
  return (
    <div className='w-1/2 h-60 overflow-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
          <h1 className='font-bold pl-2 mt-2 border-2 border-solid bg-gray-200 p-2 w-[120px] ml-2 rounded-lg'>
            {' '}
            {title}{' '}
          </h1>
          <div className='p-5 rounded-lg '> {children}</div>
        </div>
  )
}

export default TextArea