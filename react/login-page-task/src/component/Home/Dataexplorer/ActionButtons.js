import { FaFilter } from 'react-icons/fa';
import { RiResetLeftFill } from 'react-icons/ri';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlineSetting } from 'react-icons/ai';

const ActionButtons = () => (
  <div className="mt-6 pl-12 flex flex-wrap gap-3">
    <button
      className="flex items-center gap-2 bg-white text-blue-600 border 
                rounded-md px-3 py-2 text-xs font-medium shadow-sm "
    >
      <FaFilter size={14} />
      Filter
    </button>

    <button
      className="flex items-center gap-2 bg-white text-blue-600 border 
                rounded-md px-3 py-2 text-xs font-medium shadow-sm ">
      <RiResetLeftFill size={15}/>
      Reset
    </button>
    <button
      className="flex items-center gap-2 bg-white text-blue-600 border 
                rounded-md px-3 py-2 text-xs font-medium shadow-sm ">
      <BiRefresh size={18}/>
      Refresh
    </button>
    <button
      className="flex items-center gap-2 bg-white text-blue-600 border 
                rounded-md px-3 py-2 text-xs font-medium shadow-sm ">
      <AiOutlineSetting size={18}/>
      Configuration
    </button>
  </div>
);

export default ActionButtons;
