import { Navigate, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ReturnTransactionForm = ({ onSave }) => {
    const { transactionId } = useParams();
    const navigate = useNavigate();   
    const [transaction, setTransaction] = useState({
        id: transactionId || '',
        actualReturnDate: '',
        fineAmount: '',
        amountToPay: 0,
        paymentOfOutStanding : 0,
        memberID: '',
        bookID : '',
        status: 'Returned',
    });

    useEffect(() => {
      const fetchTransaction = async () => {
          try {
              if (transactionId) {
                  const response = await fetch(`http://localhost:5000/get_transaction_by_id/${transactionId}`);
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  console.log('Transaction data:', data);
  
                  const { 0: id, 3: actualReturnDate, 7: fineAmount, 6: status ,10: amountToPay, 2: memberId, 1:bookId} = data;
  
                  const formattedDate = actualReturnDate ? new Date(actualReturnDate).toISOString().split('T')[0] : '';
  
                  setTransaction({
                      id: id || '',
                      actualReturnDate: formattedDate,
                      fineAmount: fineAmount || '',
                      status: status? 'Returned' : 'Not Returned',
                      amountToPay : amountToPay,
                      memberID: memberId,
                      bookID:bookId
                  });
              }
          } catch (error) {
              toast.error('Failed to fetch transaction', error);
          }
      };
  
      if (transactionId) {
          fetchTransaction();
      }
  }, [transactionId]);
  
  

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = `http://localhost:5000/update_return_transaction/${transactionId}`;
            const method = 'PUT';

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
            console.log('Return transaction updated successfully', data);
            navigate('/transaction');
            toast.success('Return Updated Successfully')
        } catch (error) {
            toast.error('Failed to submit return transaction', error);
        }
    };

    const handleCancel = () => {
        navigate('/transaction')
    };

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <Toaster/>
            <div className="max-w-4xl mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {transactionId ? 'Return Transaction' : 'Record Return'}
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
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Member ID
                                </label>
                                <input
                                    type="text"
                                    name="id"
                                    value={transaction.memberID}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Actual Return Date
                                </label>
                                <input
                                    type="date"
                                    name="actualReturnDate"
                                    value={transaction.actualReturnDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Amount to Pay (for this transaction)
                                </label>
                                 <input
                                    type="number"
                                    name="amountToPay"
                                    value={transaction.amountToPay}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-500 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    readOnly
                               />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Payment of Outstanding Amount
                                </label>
                                <input
                                    type="number"
                                    name="paymentOfOutStanding"
                                    value={transaction.paymentOfOutStanding}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fine Amount
                                </label>
                                <input
                                    type="number"
                                    name="fineAmount"
                                    value={transaction.fineAmount}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Book ID
                                </label>
                                <input
                                    type="text"
                                    name="bookId"
                                    value={transaction.bookID}
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
                                    <option value="Returned">Returned</option>
                                    <option value="Not Returned">Not Returned</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReturnTransactionForm;
