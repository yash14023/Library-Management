import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const TransactionForm = ({ onSave }) => {
    const navigate = useNavigate();
    const { transactionId } = useParams();
    const [bookList, setBookList] = useState([])
    const [memberList, setMemberList] = useState([])
    const [transaction, setTransaction] = useState({
        id: transactionId || '',
        bookId: '',
        memberId: '',
        issueDate: '',
        returnDate: '',
        rentFee: '0',
        status: '',
        outStandingDebt: '0',
        currentDueAmount: 0
    });
   // toast.error('hey')
    console.log('Transaction:', transaction);
    useEffect(() => {
        const bookList = async () => {
            try {
                const response = await fetch('http://localhost:5000/get_book_options');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Book list:', data);
                setBookList(data);
            } catch (error) {
                console.error('Failed to fetch book list', error);
            }
        }
        const memberList = async ()  => {
            try{
                const response = await fetch('http://localhost:5000/get_members_option');
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }else{
                    const data = await response.json();
                    // console.log('Member list:', data);
                    setMemberList(data);
                    
                }
            }
            catch(error){
                console.error('Failed to fetch member list', error);
            }
        }
        const fetchTransaction = async () => {
            try {
                if (transactionId) {
                    const response = await fetch(`http://localhost:5000/get_transaction_by_id/${transactionId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log('Transaction data:', data);
                    setTransaction({
                        id: data[0], // transaction ID
                        bookId: data[1], // book ID
                        memberId: data[2], // member ID
                        issueDate: data[3] ? new Date(data[3]).toISOString().split('T')[0] : '', // format date as YYYY-MM-DD
                        returnDate: data[4] ? new Date(data[4]).toISOString().split('T')[0] : '', // format date as YYYY-MM-DD
                        rentFee: data[5], // rent fee
                        status: data[6], // status
                        fine: data[7], // fine
                        outStandingDebt: data[9],
                        currentDueAmount : data[10]
                    });
                    console.log({  id: data[0], // transaction ID
                        bookId: data[1], // book ID
                        memberId: data[2], // member ID
                        issueDate: data[3] ? new Date(data[3]).toISOString().split('T')[0] : '', // format date as YYYY-MM-DD
                        returnDate: data[4] ? new Date(data[4]).toISOString().split('T')[0] : '', // format date as YYYY-MM-DD
                        rentFee: data[5], // rent fee
                        status: data[6], // status
                        fine: data[7], // fine
                        outStandingDebt: data[9],
                        currentDueAmount : data[10]})
        
                }
            } catch (error) {
                console.error('Failed to fetch transaction', error);
            }
        }
        if (transaction?.memberId) {
            handleMemberChange(transaction.memberId);
        }
        bookList();
        memberList();
        fetchTransaction();
    }, [transactionId]);
   


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     try{
    //         const response = fetch('http://localhost:5000/add_transaction', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(transaction),
    //         });
    //         if(!response.ok){
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = response.json();
    //         console.log('Transaction added successfully', data);
            
    //     }
        
    //     catch(error){
    //         console.error('Failed to add transaction', error);
    //     }

    //     console.log('Updated transaction:', transaction);
    //     // onSave(transaction);
    // };
    const handleSubmit = async (event) => {
        const { bookId, memberId, issueDate, returnDate, status } = transaction;
        if (!bookId || !memberId || !issueDate || !returnDate || !status) {
            toast.error('Please fill in all required fields.');
            return;
        }
        // const rentFee = !Number(transaction.rentFee)? 0 :  Number(transaction.rentFee);
        const outStandingDebt = !Number(transaction.outStandingDebt)? 0 : Number(transaction.outStandingDebt);
        const currentDueAmount = !Number(transaction.currentDueAmount)? 0 : Number(transaction.currentDueAmount);
        const totalDebt = outStandingDebt + currentDueAmount;
        console.log(totalDebt,outStandingDebt,currentDueAmount)
        console.log("Total Debt:", totalDebt);
        if (totalDebt >= 500 ) {
            toast.error('Total debt exceeds the limit of 500. Transaction cannot be processed.');
            return; 
      
    }else{
        try {
            const url = transactionId
                ? `http://localhost:5000/update_transaction/${transactionId}`
                : 'http://localhost:5000/add_transaction';
    
            const method = transactionId ? 'PUT' : 'POST';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            
            // if(transaction.currentDueAmount < 0){

                const memberId = transaction.memberId;
                console.log("memberId",memberId)
                const additionalDebt = !Number(transaction.currentDueAmount)? 0 : Number(transaction.currentDueAmount);

                
                console.log("debt",additionalDebt)
                const debtResponse = await fetch("http://localhost:5000/update_customer_outstanding",{
                    method: 'POST',
                    headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    member_id: memberId,
                    additional_debt: additionalDebt,
                })
            });
            if (!debtResponse.ok) {
                throw new Error('Failed to update member debt');
            }
            const debtData = await debtResponse.json();
            console.log("debDData",debtData)
        // }

        navigate('/transaction');
        toast.success("Recorded Successfully")
            console.log(transactionId ? 'Transaction updated successfully' : 'Transaction added successfully', data);
    
        } catch (error) {
            console.error('Failed to submit transaction', error);
        }
    }
    };
    
    const handleCancel = () => {
        toast.error("Canceled")
        navigate('/transaction');
    };

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };
    const handleMemberChange = async (e) => {
        const memberId = e.target?.value;
        setTransaction((prevTransaction) => ({ ...prevTransaction, memberId }));
        try {
            if (memberId) {
                const response = await fetch(`http://localhost:5000/get_member_by_id/${memberId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched Member Data:', data);
    
                setTransaction((prevTransaction) => ({
                    ...prevTransaction,
                    outStandingDebt: data[4],
                    // currentDueAmount: data[1],
                }));
            } else {
                setTransaction((prevTransaction) => ({
                    ...prevTransaction,
                    outStandingDebt: '',
                    // currentDueAmount: '',
                }));
            }
        } catch (error) {
            console.error('Failed to fetch member data:', error);
        }
    };
    // const handleDelete = ()


    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <Toaster/>
            <div className="max-w-4xl mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {transactionId ? 'Edit Transaction' : 'Add Transaction'}
                    </h2>
                    <div className="flex items-center">
                        <button
                            onClick={handleCancel}
                            className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <form className="p-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Transaction ID
                                </label>
                                <input
                                    type="text"
                                    name="id"
                                    value={transaction.id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!!transactionId}
                                    readOnly
                                />
                            </div>
                            {transaction.bookId ? (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Book ID
        </label>
        <h1 className="text-lg font-semibold text-gray-900">
            {transaction.bookId || 'No book selected'}
        </h1>
    </div>
                            ) : (
                            <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Book ID
        </label>
        <select
            name="bookId"
            value={transaction.bookId.toString()}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Select a book</option>
            {bookList.map((book) => (
                <option key={book.bookID} value={book.bookID.toString()}>
                    {book.title}
                </option>
            ))}
        </select>
    </div>
) }

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Member ID
                                </label>
                                <select
                                    name="memberId"
                                    value={transaction.memberId}
                                    onChange={ handleMemberChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select a Member</option>
                                    {memberList.map((member) => (
                                        console.log('Member:', member),
                                        <option key={member.memberID} value={member.memberID}>
                                            {member.name} {member.email}
                                        </option>
                                    ))}
                                </select>
                              
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Issue Date
                                </label>
                                <input
                                    type="date"
                                    name="issueDate"
                                    value={transaction.issueDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    name="returnDate"
                                    value={transaction.returnDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rent Fee
                                </label>
                                <input
                                    type="number"
                                    name="rentFee"
                                    value={transaction.rentFee}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Outstanding Debt
                                </label>
                                <input
                                    type="number"
                                    name="outstandingDebt"
                                    value={transaction.outStandingDebt}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Current Due Amount
                                </label>
                                <input
                                    type="number"
                                    name="currentDueAmount"
                                    value={transaction.currentDueAmount}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                    value={transaction.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status</option>
                                    <option value="issued">Issued</option>
                                    <option value="returned">Returned</option>
                                    <option value="lost">Lost</option>
                </select>
              </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;