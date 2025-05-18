import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/http.service';
import { Loader } from '../common/Loader';
import { BackBtn } from '../common/BackBtn';

function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { repoId } = useParams();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true)
        const res = await apiClient.get(`/files/repo/${repoId}`);
        setFiles(res);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, [repoId]);




  return (
    <>
      <BackBtn/>
    
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Files</h2>
        <Link to={`/repo/${repoId}/upload`} className="p-2 bg-blue-500 text-white rounded">
          Upload File
        </Link>
      </div>
      <ul>
        {!loading  ? files?.map(file => (
          <li key={file._id} className="flex justify-between p-2 border-b">
            <span>{file.fileName}</span>
            <Link to={`/file/${file._id}/history`} className="text-blue-500">
              View History
            </Link>
          </li>
        ))
        :
        <Loader/>
      }
      </ul>
    </div>
      </>
  );
}

export default FileList;