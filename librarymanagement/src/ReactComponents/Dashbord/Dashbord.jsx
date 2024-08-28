import React, { useEffect,useState } from 'react';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0); 
  const [totalMembers, setTotalMembers] = useState(0);
  const [bookOnLoan, setBookOnLoan] = useState(0);
  const [totalTransaction,setTotalTransaction] = useState(0);
  // console.log(booksOnLoan)
  // const x =11;
    useEffect(() => {
      fetch('http://localhost:5000/get_total_books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          } else {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          setTotalBooks(data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
        fetch('http://localhost:5000/get_total_member', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            } else {
              return res.json();
            }
          })
          .then((data) => {
            console.log(data);
            setTotalMembers(data);
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });


          fetch('http://localhost:5000/books_on_loan',{
            method : 'GET',
            headers : {
              'Content-Type' : 'application/json',
            },
          }).then((res)=>{
            if(!res.ok){
              throw new Error('Network response was not ok');
            }else{
              return res.json()
            }
          })
          .then((data)=>{
            console.log(data);
            if(data.loans){

              setBookOnLoan(data.loans)
            }
          }).catch((error)=>{
            console.log('There was a problem with the fetch operation:',error)
          })


          fetch('http://localhost:5000/total_transaction',{
            method : 'GET',
            headers : {
              'Content-Type' : 'application/json',
            },
          }).then((res)=>{
            if(!res.ok){
              throw new Error('Network response was not ok');
            }else{
              return res.json()
            }
          })
          .then((data)=>{
            console.log(data.totalTransactions);
            if(data.totalTransactions){
              setTotalTransaction(data.totalTransactions)
            }
          }).catch((error)=>{
            console.log('There was a problem with the fetch operation:',error)
          })

          
    }, []); 
    return(

    <div className="min-h-auto bg-gradient-to-br from-gray-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">
          Library Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <DashboardCard
            title="Total Books"
            value={totalBooks}
            link="/booklist"
            linkText="View Books"
            bgColor="bg-blue-500"
            hoverColor="hover:bg-blue-600"
            icon="📚"
          />
          <DashboardCard
            title="Books on Loan"
            value={bookOnLoan}
            link="/transaction"
            linkText="View Transactions"
            bgColor="bg-green-500"
            hoverColor="hover:bg-green-600"
            icon="📖"
          />
          <DashboardCard
            title="Total Members"
            value={totalMembers}
            link="/member"
            linkText="View Members"
            bgColor="bg-yellow-500"
            hoverColor="hover:bg-yellow-600"
            icon="👥"
          />
          <DashboardCard
            title="Total Transactions"
            value={totalTransaction}
            link="/transaction"
            linkText="View Transactions"
            bgColor="bg-purple-500"
            hoverColor="hover:bg-purple-600"
            icon="🔄"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;