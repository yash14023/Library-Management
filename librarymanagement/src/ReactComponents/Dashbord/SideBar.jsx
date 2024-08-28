import React from 'react';
import { 
  FaHome, 
  FaBook, 
  FaUsers, 
  FaExchangeAlt, 
  FaChartBar, 
  FaCog 
} from 'react-icons/fa';

const SideBar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'books', label: 'Books', icon: FaBook },
    { id: 'members', label: 'Members', icon: FaUsers },
    { id: 'transaction', label: 'Transactions', icon: FaExchangeAlt },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <aside className="bg-gradient-to-b from-blue-800 to-blue-900 text-white w-64 flex-shrink-0 hidden md:flex md:flex-col">
      <div className="p-4 bg-blue-900">
        <h2 className="text-2xl font-bold">LMS Dashboard</h2>
      </div>
      <nav className="flex-grow">
        <ul className="mt-6 space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-4 py-3 transition-colors duration-200 ease-in-out
                  ${activeTab === item.id 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 bg-blue-900">
        <p className="text-sm text-blue-200">© 2024 LMS Dashboard</p>
      </div>
    </aside>
  );
};

export default SideBar;