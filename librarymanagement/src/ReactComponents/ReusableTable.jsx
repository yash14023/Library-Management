


import { Delete, DeleteIcon, Grab, LucideDelete, Pencil, Plus, Trash, Trash2, Undo2 } from 'lucide-react';
import React, { useState, useEffect } from 'react'

const ReusableTable = ({data, title, columns, handleClick, onEdit,idField, recordReturn,handleEditClick1, searchableFields,handleDelete}) => {

    const [searchTerms, setSearchTerms] = useState({});
    // console.log('Data received in ReusableTable:', data); 
    const [items, setItems] = useState(data);
    // const [recordReturn, setRecordReturn] = useState(recordReturn);
    // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    console.log(items)
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        setItems(data);
    }, [data]);

    // const handleSearch = (e) => {
    //     const valueThatIamgetting = e.target.value.toLowerCase();
    //     setSearchTerm(valueThatIamgetting);
    //     const filter = data.filter(item => item.title.toLowerCase().includes(valueThatIamgetting));
    //     setItems(filter);
    // }
    // const handleSearch = (field, value) => {
    //     const newSearchTerms = { ...searchTerms, [field]: value.toLowerCase() };
    //     setSearchTerms(newSearchTerms);
        
    //     const filter = data.filter(item => 
    //         Object.entries(newSearchTerms).every(([field, term]) => {
    //             const itemField = field.toLowerCase();
    //             return item[itemField] && item[itemField].toString().toLowerCase().includes(term);
    //         })
    //     );
    //     setItems(filter);
    // }
    const handleSearch = (field, value) => {
        console.log('Handling search for field:', field, 'with value:', value);
    
        const newSearchTerms = { ...searchTerms, [field]: value.toLowerCase() };
        setSearchTerms(newSearchTerms);
    
        const filter = data.filter(item => {
            console.log('Filtering item:', item);
            return Object.entries(newSearchTerms).every(([searchField, term]) => {
                const itemField = Object.keys(item).find(key => key.toLowerCase() === searchField.toLowerCase());
                const fieldValue = item[itemField];
    
                console.log('Comparing fieldValue:', fieldValue, 'with term:', term);
    
                if (fieldValue === undefined || fieldValue === null) {
                    return false;
                }
    
                if (searchField.toLowerCase().includes(Number(idField)) && !isNaN(term) && !isNaN(fieldValue)) {
                    return fieldValue.toString() === term;
                }
    
                return fieldValue.toString().toLowerCase().includes(term);
            });
        });
    
        console.log('Filtered items:', filter);
        setItems(filter);
    };
    
    
    
    
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item[idField]));
        }
        setSelectAll(!selectAll);
    };
    
  const handleSelectItem = (item) => {
    const itemId = item[idField];
    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
        setSelectedItems([...selectedItems, itemId]);
    }
    setSelectAll(false);
};
    const handleEditClick = (item) => {
        console.log(item);
        if (onEdit) {
            onEdit(item);
        }
    };
//     const onIssue = () => {
//         console.log('Issue button clicked');
//     }
//     const onReturn = () => {
//         console.log('Return button clicked');
//     }

//   const toggleDropdown = () => {
//     setIsDropDownOpen(downOpen => !downOpen);
//   };

    return (
        <div className= ' bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-8 font-sans'>
            <div className='max-w-7xl mx-auto rounded-xl shadow-2xl bg-white overflow-hidden'>
                <div className='flex justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-indigo-600'>
                    <h2 className='text-3xl font-bold text-white'>{title}</h2>
                    {/* <div className='relative'> */}
      <div className='flex justify-between items-center p-6'>
        {/* <h2 className='text-3xl font-bold text-white'>{title}</h2> */}
        <button
          onClick={handleClick}
          className=' flex bg-white text-indigo-600 px-6 py-2 rounded-full shadow hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105'
        >
          {<Plus/>}{`Add ${title}`}
        </button>
      </div>
      {/* {isDropDownOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
          <button
            onClick={() => { setIsDropDownOpen(false); handleClick(); }}
            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50'
          >
            Issue a Book
          </button>
          <button
            // onClick={() => { setDropdownOpen(false); }
            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50'
          >
            Record Return
          </button>
        </div>)} */}
    </div>
                {/* </div> */}
                <div className='p-6 flex flex-wrap gap-4'>
                    {searchableFields.map((field => (
                        <div key={field} className="flex-1 min-w-[200px]">
                <input 
    type='text' 
    placeholder={`Search ${field}` }
    value={searchTerms[field] || ''}
    onChange={(e) => handleSearch(field, e.target.value)} 
    className='w-full border rounded-full px-6 py-3 text-gray-800 placeholder-gray-500 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out'
/>

                </div>
                    )))}
                    </div>
                <div className="overflow-x-auto">
                    <table className='w-full text-left bg-white'>
                        <thead className='bg-gray-100 text-gray-700'>
                            <tr>
                                <th className='py-4 px-6'>
                                    <input 
                                        type="checkbox" 
                                        checked={selectAll} 
                                        onChange={handleSelectAll}
                                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </th>
                                {columns.map((column, index) => (
                                    <th key={index} className="py-4 px-6 text-sm font-medium uppercase tracking-wider">{column}</th>
                                ))}
                                <th className="py-4 px-6 text-sm font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y divide-gray-200">
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    // console.log('reusabletable',item),
                                    <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="py-4 px-6">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedItems.includes(item[idField])} 
                                                onChange={() => handleSelectItem(item)} 
                                                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                            />
                                        </td>
                                        {columns.map((column, index) => (
                                            // console.log('reusabletable col',item),
                                            <td key={index} className="py-4 px-6 text-sm">
                                                {item[Object.keys(item).find(key => key.toLowerCase() === column.toLowerCase())] || ''}
                                            </td>
                                        ))}
                                        <td className=" flex flex-1 space-x-3 py-4 px-6 mt-5">
                                            
                                            <button 
                                                onClick={() => handleEditClick(item)}
                                                className="text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out"
                                            >
                                                <Pencil/>
                                            </button>
                                     
                                            

                                                { recordReturn && (
                                                <button 
                                                    onClick={() => handleEditClick1(item)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out"
                                                >
                                                    <Undo2/>
                                                </button>
                                                )}
                                                <button onClick={()=>handleDelete(item[idField])} className='text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out' >
                                                    <Trash2/>
                                                </button>
                                            </td>
                                        
                                       
                                    </tr>
                                
                                ))
                            ) : (
                                <tr>
            <td colSpan={columns.length + 2} className="py-4 px-6 text-center">No data available</td>
        </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-gray-50">
                    <p className="text-gray-700 text-sm font-medium">{selectedItems.length} of {items.length} items selected</p>
                </div>
            </div>
        </div>
    )
}

export default ReusableTable



























// import { Pencil, Plus, Undo2 } from 'lucide-react';
// import React, { useState, useEffect } from 'react'

// const ReusableTable = ({data, title, columns, handleClick, onEdit, idField, recordReturn, handleEditClick1, searchableFields}) => {

//     const [searchTerms, setSearchTerms] = useState({});
//     const [items, setItems] = useState(data);
//     console.log(items)
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [selectAll, setSelectAll] = useState(false);

//     useEffect(() => {
//         setItems(data);
//     }, [data]);

//     const handleSearch = (field, value) => {
//         console.log('Handling search for field:', field, 'with value:', value);
    
//         const newSearchTerms = { ...searchTerms, [field]: value.toLowerCase() };
//         setSearchTerms(newSearchTerms);
    
//         const filter = data.filter(item => {
//             console.log('Filtering item:', item);
//             return Object.entries(newSearchTerms).every(([searchField, term]) => {
//                 const itemField = Object.keys(item).find(key => key.toLowerCase() === searchField.toLowerCase());
//                 const fieldValue = item[itemField];
    
//                 console.log('Comparing fieldValue:', fieldValue, 'with term:', term);
    
//                 if (fieldValue === undefined || fieldValue === null) {
//                     return false;
//                 }
    
//                 if (searchField.toLowerCase() === idField.toLowerCase() && !isNaN(term) && !isNaN(fieldValue)) {
//                     return fieldValue.toString() === term;
//                 }
    
//                 return fieldValue.toString().toLowerCase().includes(term);
//             });
//         });
    
//         console.log('Filtered items:', filter);
//         setItems(filter);
//     };
    
//     const handleSelectAll = () => {
//         if (selectAll) {
//             setSelectedItems([]);
//         } else {
//             setSelectedItems(items.map(item => item[idField]));
//         }
//         setSelectAll(!selectAll);
//     };
    
//     const handleSelectItem = (item) => {
//         const itemId = item[idField];
//         if (selectedItems.includes(itemId)) {
//             setSelectedItems(selectedItems.filter(id => id !== itemId));
//         } else {
//             setSelectedItems([...selectedItems, itemId]);
//         }
//         setSelectAll(false);
//     };

//     const handleEditClick = (item) => {
//         console.log(item);
//         if (onEdit) {
//             onEdit(item);
//         }
//     };

//     return (
//         <div className='bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-8 font-sans'>
//             <div className='max-w-7xl mx-auto rounded-xl shadow-2xl bg-white overflow-hidden'>
//                 <div className='flex justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-indigo-600'>
//                     <h2 className='text-3xl font-bold text-white'>{title}</h2>
//                     <div className='flex justify-between items-center p-6'>
//                         <button
//                             onClick={handleClick}
//                             className='flex bg-white text-indigo-600 px-6 py-2 rounded-full shadow hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105'
//                         >
//                             {<Plus/>}{`Add ${title}`}
//                         </button>
//                     </div>
//                 </div>
//                 <div className='p-6 flex flex-wrap gap-4'>
//                     {searchableFields.map((field => (
//                         <div key={field} className="flex-1 min-w-[200px]">
//                             <input 
//                                 type='text' 
//                                 placeholder={`Search ${field}`}
//                                 value={searchTerms[field] || ''}
//                                 onChange={(e) => handleSearch(field, e.target.value)} 
//                                 className='w-full border rounded-full px-6 py-3 text-gray-800 placeholder-gray-500 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out'
//                             />
//                         </div>
//                     )))}
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className='w-full text-left bg-white'>
//                         <thead className='bg-gray-100 text-gray-700'>
//                             <tr>
//                                 <th className='py-4 px-6'>
//                                     <input 
//                                         type="checkbox" 
//                                         checked={selectAll} 
//                                         onChange={handleSelectAll}
//                                         className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
//                                     />
//                                 </th>
//                                 {columns.map((column, index) => (
//                                     <th key={index} className="py-4 px-6 text-sm font-medium uppercase tracking-wider">{column}</th>
//                                 ))}
//                                 <th className="py-4 px-6 text-sm font-medium uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-gray-600 divide-y divide-gray-200">
//                             {items.length > 0 ? (
//                                 items.map((item, index) => (
//                                     <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
//                                         <td className="py-4 px-6">
//                                             <input 
//                                                 type="checkbox" 
//                                                 checked={selectedItems.includes(item[idField])} 
//                                                 onChange={() => handleSelectItem(item)} 
//                                                 className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
//                                             />
//                                         </td>
//                                         {columns.map((column, index) => (
//                                             <td key={index} className="py-4 px-6 text-sm">
//                                                 {item[Object.keys(item).find(key => key.toLowerCase() === column.toLowerCase())] || ''}
//                                             </td>
//                                         ))}
//                                         <td className="flex flex-1 space-x-3 py-4 px-6 mt-5">
//                                             <button 
//                                                 onClick={() => handleEditClick(item)}
//                                                 className="text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out"
//                                             >
//                                                 <Pencil/>
//                                             </button>
//                                             {recordReturn && (
//                                                 <button 
//                                                     onClick={() => handleEditClick1(item)}
//                                                     className="text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out"
//                                                 >
//                                                     <Undo2/>
//                                                 </button>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={columns.length + 2} className="py-4 px-6 text-center">No data available</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="p-6 bg-gray-50">
//                     <p className="text-gray-700 text-sm font-medium">{selectedItems.length} of {items.length} items selected</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ReusableTable


