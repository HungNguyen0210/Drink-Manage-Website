import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
  // Thêm state và logic cho dropdown fabell
  const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false);

  const toggleBellDropdown = () => {
    setIsBellDropdownOpen(!isBellDropdownOpen);
  };

  // Đóng dropdown khi nhấn ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".bell-dropdown") && 
        !event.target.closest(".bell-icon") 
      ) {
        setIsBellDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <FontAwesomeIcon
        icon={faBell}
        className="bell-icon cursor-pointer pt-1 text-3xl"
        onClick={toggleBellDropdown}
      />
      {isBellDropdownOpen && (
        <div className="bell-dropdown absolute right-0 top-[40px] z-20 w-[240px] border-2 border-black bg-white text-black shadow-lg">
          <ul>
            <li className="cursor-pointer px-4 py-3 hover:bg-black hover:text-white">
              Thông báo 1
            </li>
            <li className="cursor-pointer px-4 py-3 hover:bg-black hover:text-white">
              Thông báo 2
            </li>
            <li className="cursor-pointer px-4 py-3 hover:bg-black hover:text-white">
              Thông báo 3
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
