import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams,useNavigate } from 'react-router-dom';

const MemberForm = ({ onSave }) => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [member, setMember] = useState({
    // id: memberId || '',
    name: '',
    email: '',
    contact: '',
    outstanding_debt: 0,
    date_of_registration: '',
    status: 'active',
  });

  // useEffect(() => {
  //   if (memberId) {
  //     const fetchMember = async () => {
  //       const response = await fetch(`/api/members/${memberId}`);
  //       const data = await response.json();
  //       setMember(data);
  //     };
  //     fetchMember();
  //   }
  // }, [memberId]);
  

  const handleSubmit = async (event) => {
    if (!member.name) {
      toast.error("Name is required");
      return;
    }
    event.preventDefault();
    console.log('Updated member:', member);
    try{
      const response =await fetch('http://localhost:5000/add_member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }  
        const data = await response.json();
        navigate('/member');
        toast.success('Member added successfully');

    }catch(error){
      toast.error('Failed to add memeber', error);
    }
    // onSave(member);
  };

  const handleCancel = () => {
   navigate('/members')
   toast.error('Cancelled')
  };

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {'Add Member'}
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
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!!memberId}
                  readOnly
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
                  required = {true}
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

export default MemberForm;
