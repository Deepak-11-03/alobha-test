import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/http.service';
import { BackBtn } from '../common/BackBtn';

function FileUpload() {
  const [file, setFile] = useState(null);
  const { repoId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);
    try {
      await apiClient.post(`/files/upload/${repoId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/repo/${repoId}/files`);
    } catch (error) {
      alert('Error uploading file');
    }
  };

  return (
    <>
      <BackBtn />

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Upload File</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default FileUpload;