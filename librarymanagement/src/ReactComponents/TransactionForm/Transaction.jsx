import React, { useEffect, useState } from 'react'
import ReusableTable from '../ReusableTable'
import { useNavigate } from 'react-router-dom'
import { toast,Toaster } from 'react-hot-toast';
// import { columns } from '../BookList/Test';
const Transaction = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/get_transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }).then(data => {
      console.log('yes iam here', data);
      setTransaction(data);
    })
  }, [])
  
  const handleAddBtn = () => {
      // setShowDropdown(!showDropdown);
    navigate('/transaction/add');
  }
  const handleEdit = (transaction) => {
    console.log('Edit transaction inside transcasdnca:', transaction.transactionID);
    
    navigate(`/transaction/edit/${transaction.transactionID}`);
    // useEffect(() => {
    //   fetch(`http://localhost:5000/get_transactions_by_id/${transaction}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }).then(res => {
    //     if (!res.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return res.json();
    //   }).then(data => {
    //     console.log('yes iam here', data);
    //     setTransaction(data);
    //   })
    // })    
  } 

  const handleNewTransaction = () => {
    
    navigate('/transaction/add');

  };

  const handleReturnTransaction = (transaction) => {
    navigate(`/transaction/return/${transaction.transactionID}`);
  };
  const handleEditClick1 = (transaction) => {
    console.log('Edit transaction:',transaction);
    navigate(`/transaction/return/${transaction.transactionID}`);
  };
  const handleDelete = (transactionID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Transaction?");
    if (confirmDelete) {
      console.log('Deleting transaction with ID:', transactionID);
  
      fetch(`http://localhost:5000/delete_transaction_by_id/${transactionID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error:', data.error);
          toast.error('Failed to delete Transaction');
          return;
        }
        console.log('Success:', data);
        toast.success("Transaction Deleted Successfully.");  
        setTransaction(prevTransaction => prevTransaction.filter(transaction => transaction.transactionID !== transactionID));
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to delete Transaction');
      });
    } else {
      console.log('Delete operation cancelled');
      toast.info('Delete operation cancelled');
    }
  }
  
  const columnsForListView = ['transactionID', 'bookId', 'memberId', 'issueDate', 'Status', 'RentFee'];
  return (
    <div>
      <Toaster/>
      {showDropdown && (
        <div className="dropdown-menu">
          <button onClick={handleNewTransaction}>New Transaction</button>
          <button onClick={handleReturnTransaction}>Return Transaction</button>
        </div>
      )}
      <ReusableTable data={transaction} title={'Transaction'} idField={"transactionID"} columns={columnsForListView} handleClick={handleAddBtn} onEdit={handleEdit} recordReturn={true} handleEditClick1={handleEditClick1} searchableFields={columnsForListView} handleDelete={handleDelete}/>
    </div>
  )
}

export default Transaction
