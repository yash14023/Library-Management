import React, { useEffect, useState } from 'react';
import Dashboard from './Dashbord';
import SideBar from './SideBar';
import BookList from '../BookList/BookList';
import MemberList from '../MemberList/Member';
import TransactionList from '../TransactionForm/Transaction';
import { Link, useNavigate } from 'react-router-dom';
import { CommandDemo } from './CommandDemo';

const Tester = () => {
  // const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState('home');
  
  // useEffect(() => {
  //   switch (activeTab) {
  //     case 'home':
  //       navigate('/');
  //       break
  //     case 'books':
  //       navigate('/booklist');
  //       break
  //     case 'members':
  //       navigate ('/member');
  //       break
  //     case 'transaction':
  //       navigate ('/transaction');
  //       break
  //     default:
  //       navigate('/');
  //       break
  //   }
  // }, [activeTab,navigate]);
  return (
    <HomeContent/>
  );
};

const HomeContent = () => (
  <>
  <div className='p-0'>
   <Dashboard/>
    </div>
  </>
);


export default Tester;

