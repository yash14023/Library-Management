import React,{useState,useEffect} from 'react'
import ReusableTable from '../ReusableTable';
import { Navigate, useNavigate } from 'react-router-dom';
// import { columns } from '../BookList/Test';
import toast, { Toaster } from 'react-hot-toast';
const Member = () => {
  const navigate = useNavigate();
  const [members,setMembers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/get_members',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log('yes iam here',data);
      setMembers(data);
    })
  },[])
      const handleAddBtn = () => {
        navigate('/member/add');
      }
      const handleEdit = (member) => {
        console.log('Edit member:', member);
        navigate(`/member/edit/${member.memberID}`);
      }
      // const handleDelete = (members) =>{
      //   const confirmDelete = window.confirm("Are you sure you want to delete this Member?");

      //   if(confirmDelete){
      //     console.log('cheking',members);
     
      //     fetch(`http://localhost:5000/delete_member_by_id/${members}`, {
      //       method: 'DELETE',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     })
      //     .then(response => response.json())
      //     .then(data => {
      //       console.log('Success:', data);
      //       toast.success(data.message)
    
      //       setMembers(prevMembers => prevMembers.filter(member => member.memberID !== member));
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error);
      //       toast.error('Failed to delete Member');
      //     });
      //   } else {
      //     console.log('Delete operation cancelled');
      //     // toast.info('Delete operation cancelled');
      //   }
        // }

        const handleDelete = (memberId) => {
          if(members.memberID){
            console.log(members)
          }



          const confirmDelete = window.confirm("Are you sure you want to delete this Member?");
          if (confirmDelete) {
            console.log('Deleting member with ID:', memberId);
         
            fetch(`http://localhost:5000/delete_member_by_id/${memberId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              toast.success("Member Deleted Successfully.");
        
              // Update the state to remove the deleted member
              setMembers(prevMembers => prevMembers.filter(member => member.memberID !== memberId));
            })
            .catch((error) => {
              console.error('Error:', error);
              toast.error('Failed to delete Member');
            });
          } else {
            console.log('Delete operation cancelled');
            toast.info('Delete operation cancelled');
          }
        }
      const columnsForListView = ['memberID', 'name', 'email', 'status'];
  return (
    <div>
    <Toaster/>
        <ReusableTable 
        data={members} 
        title="Member List" 
        columns={columnsForListView}
        handleClick={handleAddBtn} 
        onEdit={handleEdit}
        idField={'memberID'}
        searchableFields={columnsForListView}
        handleDelete={(memberID)=> {handleDelete(memberID)}}
      />
    </div>
  )
}

export default Member
