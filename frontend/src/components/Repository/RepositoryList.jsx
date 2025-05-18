import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import apiClient from '../../services/http.service';
import { Loader } from '../common/Loader';

function RepositoryList() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true)
        const res = await apiClient.get('/repositories');
        setRepositories(res);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching repositories:', error);
      }
    };
    fetchRepositories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repo => repo._id !== id));
    } catch (error) {
      alert('Error deleting repository');
    }
  };


    // if(loading) return <Loader/>

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl">Your Repositories</h2>
        <div>
          <Link to="/create-repo" className="p-2 bg-blue-500 text-white rounded">
            Create Repository
          </Link>
        
        </div>
      </div>
      <ul>
        {!loading ? repositories?.map(repo => (
          <li key={repo._id} className="flex justify-between p-2 border-b">
            <Link to={`/repo/${repo._id}/files`} className="text-blue-500">{repo.name}</Link>
            <div>
              <Link to={`/repo/${repo._id}/upload`} className="p-1 bg-green-500 text-white rounded mr-2">
                Upload File
              </Link>
              <button onClick={() => handleDelete(repo._id)} className="p-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </li>
        ))
      :
      <Loader/>
      }
      </ul>
    </div>
  );
}

export default RepositoryList;