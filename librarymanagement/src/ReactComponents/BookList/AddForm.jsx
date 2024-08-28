import React, { useEffect, useState } from 'react';

import {Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddForm = () => {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        bookID: '',
        title: '',
        authors: '',
        average_rating: '',
        isbn: '',
        isbn13: '',
        language_code: '',
        num_pages: '',
        ratings_count: '',
        text_reviews_count: '',
        publication_date: '',
        publisher: '',
        publication_year: '',
        qty: '',
        status: 'Available',
        // isAvailable: false
    });

    useEffect(() => {
        setBook(prevBook => ({
            ...prevBook,
            isAvailable: prevBook.qty > 0
        }));
    }, [book.qty]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/add_book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Success:', data);
            // toast.success('Book added successfully!');
            navigate('/booklist')
        
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to add book');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
        {/* <ToastBar/> */}
            <div className="max-w-4xl mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">New Book</h2>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="bg-gray-110 shadow-md rounded-lg overflow-hidden">
                    <form className="p-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.keys(book).map((key) => (
                                <div key={key} className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </label>
                                    {key === 'publication_date' ? (
                                        <input
                                            type="date"
                                            name={key}
                                            value={book[key]}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        />
                                    ) : key === 'isAvailable' ? (
                                        <input
                                            type="checkbox"
                                            name={key}
                                            checked={book[key]}
                                            onChange={handleChange}
                                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                        />
                                    ) :
                                     key === 'bookID' ? (
                                        <input
                                            type="text"
                                            name={key}
                                            value={book[key]}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            disabled
                                        />
                                    
                                    
                                      ) : key === 'status' ? (
                                        <select
                                            name="status"
                                            value={book.status}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Not Available">Not Available</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={key === 'average_rating' || key === 'qty' ? 'number' : 'text'}
                                            name={key}
                                            value={book[key]}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddForm;











































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// const AddForm = () => {
//     const [book, setBook] = useState({
//         bookID: '',
//         title: '',
//         authors: '',
//         average_rating: '',
//         isbn: '',
//         isbn13: '',
//         language_code: '',
//         num_pages: '',
//         ratings_count: '',
//         text_reviews_count: '',
//         publication_date: '',
//         publisher: '',
//         publication_year: '',
//         qty : '',
//         status : '',
//         isAvailable :false
//     });
//     useEffect(() => {
//         setBook(prevBook => ({
//             ...prevBook,
//             isAvailable: prevBook.qty > 0
//         }));
//     }, [book.qty]);
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setBook((prevBook) => ({
//             ...prevBook,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/add_book', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(book)
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             console.log('Success:', data);
//             alert('Book added successfully!');
//         } catch (error) {
//             console.error('Fetch error:', error);
//             alert('Failed to add book');
//         }
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen p-8">
//         <div className="max-w-4xl mx-auto">
//             <div className="mb-4 flex items-center justify-between">
//                 <h2 className="text-2xl font-bold text-gray-800">New Book</h2>
//                 <div className="flex items-center">
//                     <button
//                         type="button"
//                         className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         onClick={handleSubmit}
//                         className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//             <div className="bg-gray-110 shadow-md rounded-lg overflow-hidden">
//                 <form className="p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {Object.keys(book).map((key) => (
//                             <div key={key} className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name={key}
//                                     value={book[key]}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//     );
// };

// export default AddForm;