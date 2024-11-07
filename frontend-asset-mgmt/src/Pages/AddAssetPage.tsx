import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAssetPage: React.FC = () => {
    const navigate = useNavigate();
    const [filename, setFilename] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            fileName: filename,
            // Add other fields here if needed, such as file type, file size, etc.
        };
        try {
            const response = await axios.post('http://localhost:8080/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);  // Handle server response

            // Redirect to home page after successful upload
            navigate('/home');
        } catch (error) {
            alert("Error uploading file");
            console.error('Error uploading file:', error);
        }

    }

    return (
        <div style={{
            height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
            overflow: 'hidden',
        }}>

            <div className="container" style={{ width: '100%', maxWidth: "500px", padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#d3d3d3', opacity: '90%' }}>
                <h2 className="text-center">Upload an asset</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name" className="form-label">Asset Name</label>
                        <input type="text" className="form-control" id="name" placeholder="" />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="assetType" className="form-label">Asset Type</label>
                        <select id="assetType" className="form-select">
                            <option value="">Select an Asset Type</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fileInput" className="form-label">Select File</label>
                        <input
                            type="file"
                            id="fileInput"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Upload</button>
                </form>
            </div>
        </div>
    );
};


export default AddAssetPage;