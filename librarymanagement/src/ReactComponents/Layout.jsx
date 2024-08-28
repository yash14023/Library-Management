import React, { useEffect, useState } from 'react';

import SideBar from './Dashbord/SideBar'
import { Link, useNavigate } from 'react-router-dom';
import { CommandDemo } from './Dashbord/CommandDemo';

const Tester = ({children}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  
  useEffect(() => {
    switch (activeTab) {
      case 'home':
        navigate('/');
        break
      case 'books':
        navigate('/booklist');
        break
      case 'members':
        navigate ('/member');
        break
      case 'transaction':
        navigate ('/transaction');
        break
      default:
        navigate('/');
        break
    }
  }, [activeTab]);
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>

    
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Library Management System</h1>
        </header>
      <div>
      {/* <ComboboxDemo/> */}
      <CommandDemo/>
      {children}
        {/* <HomeContent/> */}
        </div>
 
      </main>
    </div>
  );
};

export default Tester;


