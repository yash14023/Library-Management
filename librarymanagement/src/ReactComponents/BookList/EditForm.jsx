import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditForm = () => {
    const { bookid } = useParams();
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
        status: 'Available'
    });
    

    useEffect(() => {
      const fetchBook = async () => {
          try {
              const response = await fetch(`http://localhost:5000/get_book/${bookid}`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log('Book data:', data); 
              

              const date = new Date(data[10]);
              const formattedDate = date.toISOString().split('T')[0]; 
              console.log('Formatted date:', formattedDate);
              const bookObject = {
                bookID: data[0],
                title: data[1],
                authors: data[2],
                average_rating: data[3],
                isbn: data[4],
                isbn13: data[5],
                language_code: data[6],
                num_pages: data[7],
                ratings_count: data[8],
                text_reviews_count: data[9],
                publication_date: formattedDate,
                publisher: data[11],
                publication_year: data[12],
                qty: data[13],
                status: data[14] || 'Available'
              };
              setBook(bookObject);
          } catch (error) {
              console.error('Fetch error:', error);
          }
      };
  
      fetchBook();
  }, []);

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
            const response = await fetch(`http://localhost:5000/update_book/${bookid}`, {
                method: 'PUT',
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
            // alert('Book updated successfully!');
            navigate('/booklist'); 
        } catch (error) {
            console.error('Fetch error:', error);
            // alert('Failed to update book');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => navigate('/booklist')}
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

export default EditForm;






// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const EditForm = () => {
//   const { bookid } = useParams();
//   const [book, setBook] = useState(bookid);

//   // useEffect(() => {
  
//   //   const fetchBook = async () => {
//   //     // Simulating API call
//   //     const response = await fetch(`/api/books/${bookid}`);
//   //     const data = await response.json();
//   //     setBook(data);
//   //   };

//   //   fetchBook();
//   // }, [bookid]);

//   const handleSubmit = (updatedBook) => {
//     // Handle the submit logic here
//     console.log('Updated book:', updatedBook);
//     // You would typically make an API call to update the book
//   };

//   const handleCancel = () => {
//     // Handle cancel logic, e.g., redirect to book list
//     console.log('Edit cancelled');
//   };

//   if (!book) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">Edit Book: {book.title}</h2>
//           <div className="flex items-center">
//             <button
//               onClick={handleCancel}
//               className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => handleSubmit(book)}
//               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <form className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {Object.entries(book).map(([key, value]) => (
//                 <div key={key} className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={value}
//                     onChange={(e) => setBook({...book, [key]: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               ))}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditForm;