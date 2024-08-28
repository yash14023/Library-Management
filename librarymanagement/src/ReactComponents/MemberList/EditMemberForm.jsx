import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams,useNavigate } from 'react-router-dom';

const EditMemberForm = ({ onSave, onCancel }) => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    id: memberId || '',
    name: '',
    email: '',
    contact: '',
    outstanding_debt: '',
    status: 'active',
  });

  useEffect(() => {
    const fetchMember = async () => {
    try {
      // if (memberId) {
        const res =await fetch(`http://localhost:5000/get_member_by_id/${memberId}`);
        console.log(res)
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
          const data = await res.json();
          console.log('memeber data',data);
          const formattedDate = new Date(data[5]).toISOString().split('T')[0];
          const memeberDataObject ={
            id : data[0],
            name : data[1],
            email : data[2],
            contact : data[3],
            outstanding_debt : data[4],
            date_of_registration : formattedDate,
            status : data[6]
            
          } 
          setMember(memeberDataObject);
        
      }
  // }
    catch (error) {
      console.error('Failed to fetch member', error);

    }
  }
  fetchMember();
}, []);

  const handleSubmit =async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/update_member/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
    
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      console.log('Member updated successfully', data);
      navigate('/member');
    } catch (error) {
      console.error('Failed to update member', error);
      toast.error('Failed to update member');
    }
    console.log('Updated member:', member);
    // onSave(member);
  };

  const handleCancel = () => {
    navigate('/member')
    toast.error('Cancelled')
  };

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Toaster/>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {memberId ? 'Edit Member' : 'Add Member'}
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
                  ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={member.id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!!memberId}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={member.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={member.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={member.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Registration
                </label>
                <input
                  type="date"
                  name="date_of_registration"
                  value={member.date_of_registration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Outstanding Debt
                </label>
                <input
                  type="text"
                  name="outstanding_debt"
                  value={member.outstanding_debt}
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
                  value={member.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMemberForm;
