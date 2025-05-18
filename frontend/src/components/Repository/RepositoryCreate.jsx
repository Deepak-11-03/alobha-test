import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/http.service';
import { BackBtn } from '../common/BackBtn';

function RepositoryCreate() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/repositories', { name });
      navigate('/');
    } catch (error) {
      alert('Error creating repository');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Create Repository</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Repository Name"
          className="w-full p-2 mb-4 border rounded"
          required
        />
       <div className="flex justify-end ms-auto gap-2 w-1/2">
         <button onClick={()=> navigate(-1)} className="w-full p-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Create
        </button>
       </div>
          
        
      </form>
    </div>
  );
}

export default RepositoryCreate;