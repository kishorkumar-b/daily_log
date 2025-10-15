import ActionButtons from "./ActionButtons";
const RecordsAndCheckbox = () => (
  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
    <div>
      <label className="block text-xs font-medium text-blue-900 font-semibold mb-1">Records Duration</label>
      <select className="w-[200px]  border-b-2 border-gray-300 bg-gray-100 px-3 py-1 text-sm
             focus:border-blue-500 focus:ring-0 focus:outline-none active:outline-none"
          >
        <option>Last 7 Days</option>
      </select>
    </div>

    <label className="inline-flex items-center mt-2 sm:mt-7 text-sm">
      <input type="checkbox" className="form-checkbox text-blue-600 mr-2" defaultChecked />
      Hide Empty Folder
    </label>
    <ActionButtons />
  </div>
);

export default RecordsAndCheckbox;
