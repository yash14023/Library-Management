import React, { useEffect, useState } from 'react';
import ReusableTable from '../ReusableTable';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  console.log(books);
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddBtn = () => {
    navigate('/booklist/add');
    setEditBook(null);
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/bookdata", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {setBooks(data); setLoading(false)})
    .catch(error => console.error('Fetch error:', error));
  },[]);

  const handleImportClick = () => {
    console.log('Importing books:', books);
    fetchBookData();
    toast.success("Book Imported Successfully.")
    // importBooks()

      // .then(() => {
      //   fetchBookData();
      // })
      // .catch(error => console.error('Error importing data:', error));
  };
  //   useEffect(() => {
//     setLoading(true);
//     fetch("http://localhost:5000/api/proxy", {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return res.json();
//     })
//     .then(data => {
//       console.log(data.message);
//       setBooks(data.message); 
//       setLoading(false);
//     })
//     .catch(error => {
//       console.error('Fetch error:', error);
//       setLoading(false);
//     });
//   }, []);
//   useEffect(() => {
//   const handleImportClick = () => {
//     handleImportClick();
//   };
// }, [books]);

  // const importBooks = () => {
    // console.log('Importing books:', books);
    // return fetch("http://localhost:5000/import_books", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(books),
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('Data imported successfully:', data);
    // });
  // };
  
  const fetchBookData = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/proxy", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      // console.log(data.message);
      setBooks(data.message); 
      setLoading(false);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setLoading(false);
    });
  };
  // const handleFormSubmit = (bookData) => {
  //   if (Object.values(bookData).every(value => value)) {
  //     if (editBook) {
  //       setBooks(prevBooks =>
  //         prevBooks.map(book => (book.id === editBook.id ? bookData : book))
  //       );
  //     } else {
  //       setBooks(prevBooks => [...prevBooks, bookData]);
  //     }
  //   } else {
  //     alert('Please fill in all fields');
  //   }
  // };
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleEdit = (book) => {
    navigate(`/booklist/edit/${book.bookID}`);

  };

  const handleDelete = (transactionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    
    if (confirmDelete) {
      console.log(transactionId);
     
      fetch(`http://localhost:5000/delete_book_by_id/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        toast.success(data.message)

        setBooks(prevBooks => prevBooks.filter(book => book.bookID !== transactionId));
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to delete book');
      });
    } else {
      console.log('Delete operation cancelled');
      toast.info('Delete operation cancelled');
    }
  }
  

  const columns = ['bookid', 'Title', 'Author', 'Status','Publisher'];

  return (
     <div className="relative">
      {/* Settings button */}
    <Toaster/>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleSettings}
          className="p-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
         Import More Books
        </button>
        
        {isSettingsOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1">
            <div className="flex justify-center w-full my-4">
          <button
            onClick={handleImportClick}
            className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import Books
          </button>
        </div>
            </div>
          </div>
        )}
      </div>

      <div>
      
        <ReusableTable
          data={books}
          title="Book List"
          columns={columns}
          handleClick={handleAddBtn}
          onEdit={handleEdit}
          idField={'bookID'}
          searchableFields={columns}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default BookList;

