import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/http.service';
import { Loader } from '../common/Loader';
import { BackBtn } from '../common/BackBtn';

function FileHistory() {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const { fileId } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        const res = await apiClient.get(`/files/${fileId}/history`);
        setVersions(res);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching file history:', error);
      }
    };
    fetchHistory();
  }, [fileId]);

  const handleDownload = async (version) => {
    try {
      const res = await apiClient.get(`/files/${fileId}/version/${version}`);
      const { fileName, content } = res;
      const link = document.createElement('a');
      link.href = `data:application/octet-stream;base64,${content}`;
      const name = fileName?.split('.')?.[0]
      const extenstion = fileName?.split('.')?.[1]
      link.download = `${name}_v${version}.${extenstion}`;
      link.click();
    } catch (error) {
      alert('Error downloading file');
    }
  };




  return (
    <>
  <BackBtn/>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">File Version History</h2>
      <ul>
        {!loading ?  versions?.map(version => (
          <li key={version.version} className="flex justify-between p-2 border-b">
            <span>Version {version.version} - {new Date(version.createdAt).toLocaleString()}</span>
            <button
              onClick={() => handleDownload(version.version)}
              className="p-1 bg-blue-500 text-white rounded"
              >
              Download
            </button>
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

export default FileHistory;