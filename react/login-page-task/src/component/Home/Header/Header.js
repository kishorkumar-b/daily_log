
import Dropdown from "./Dropdown";
import { getDecryptedCredentials} from "../../Login/Authstore";


const Header = () => {



const Credential = getDecryptedCredentials()
const capitalizeFirstLetter = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";


  return (
    <header className="flex items-center justify-between bg-white text-black px-6 py-3 relative">
      {/* Left section - Logo + version */}
      <div className="flex items-center space-x-4">
        <img
          src="	http://localhost:9093/LogilabSDMS/images/SDMS_Logo.png"
          alt="Logo"
          className="w-16"
        />
        <span className="text-[10px] pt-4 text-gray-150 ">v7.2_20250520_01</span>
      </div>

      {/* Right section - User info */}
      <div className="flex items-center space-x-4 relative">
          <label className="text-[11px] text-blue-900 font-semibold block">
            Time Zone: <label className="text-[11px] text-black">Asia/Kolkata (UTC+05:30)</label>
          </label>
          <label className="text-[11px] text-blue-900 font-semibold block">
            Domain: <label className="text-[11px] text-black">SDMS</label>
          </label>
          <label className="text-[11px] text-blue-900 font-semibold block">
            Site: <label className="text-[11px] text-black">Chennai</label>
          </label>
        <div className="flex flex-col items-end border-l border-gray-300 pl-4">
          <span className="text-sm font-medium">{capitalizeFirstLetter(Credential.username)}</span>
          <span className="text-xs text-gray-400">{Credential.username}</span>
        </div>

        {/* Dropdown Toggle */}
        <Dropdown/>
      </div>
    </header>
  );
};

export default Header;
