import React from 'react';
import { useNavigate } from 'react-router-dom';
const DashboardCard = ({ title, value, link, linkText, bgColor, hoverColor, icon }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`${bgColor} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <span className="text-3xl">{icon}</span>
        </div>
        <p className="text-5xl font-bold text-white mb-4">{value}</p>
        <button
          onClick={() => navigate(link)} 
          className={`inline-block py-2 px-4 bg-white text-sm font-medium rounded-full text-indigo-600 ${hoverColor} transition-colors duration-300`}
        >
          {linkText}
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;