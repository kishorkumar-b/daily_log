
const FilterSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 pr-[150px]">
    <div>
      <label className="block text-xs font-medium text-blue-900 font-semibold mb-1">Storage Group</label>
      <select className="w-[200px]  border-b-2 border-gray-300 bg-gray-100 px-3 py-1 text-sm
             focus:border-blue-500 focus:ring-0 focus:outline-none active:outline-none"
        >
        <option>ftp_test</option>
      </select>
    </div>

    <div>
      <label className="block text-xs font-medium text-blue-900 font-semibold mb-1">Client</label>
      <select className="w-full  border-b-2 border-gray-300 bg-gray-100 px-3 py-1 text-sm
             focus:border-blue-500 focus:ring-0 focus:outline-none active:outline-none"
        >
        <option>All</option>
      </select>
    </div>

    <div>
      <label className="block text-xs font-medium text-blue-900 font-semibold mb-1">Instrument</label>
      <select className="w-full  border-b-2 border-gray-300 bg-gray-100 px-3 py-1 text-sm
             focus:border-blue-500 focus:ring-0 focus:outline-none active:outline-none"
        >
        <option>Select</option>
      </select>
    </div>

    <div>
      <label className="block text-xs font-medium text-blue-900 font-semibold mb-1">Task Status</label>
      <select className="w-full  border-b-2 border-gray-300 bg-gray-100 px-3 py-1 text-sm
             focus:border-blue-500 focus:ring-0 focus:outline-none active:outline-none"
        >
        <option>All</option>
      </select>
    </div>

    <div>
      <label className="block text-xs font-medium text-blue-900 font-semibold mb-1">Workflow Status</label>
      <select className="w-full  border-b-2 border-gray-200 bg-gray-100 px-3 py-1 text-sm
             focus:border-blue-500 focus:ring-0 focus:outline-none active:outline-none"
        >
        <option>All</option>
        
      </select>
    </div>
  </div>
);

export default FilterSection;
