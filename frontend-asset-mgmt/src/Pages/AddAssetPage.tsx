import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAsset } from '../Services/assetService';
import DownloadTemplateButton from '../Components/downloadTemplate';
import UploadExcelButton from '../Components/uploadTemplateButton';

const AddAssetPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [filePath, setFilePath] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [fileType, setFileType] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Automatically set the current date for the asset
        const date = new Date().toISOString();

        // Create the new asset object
        const newAsset = {
            name: 'Asset Name',
            category: 'Category',
            filePath: 'path/to/file',
            description: 'Asset description',
            owner: 'Owner Name',
            fileType: 'Type',
            date: '2024-12-26',
            comments: '',              // Add a default empty string for comments
            id: undefined              // Optional, since it's in the interface as "id?"
        };

        try {
            // Call the createAsset function from services
            const createdAsset = await createAsset(newAsset);

            // Log the created asset or handle success
            console.log('Created new asset:', createdAsset);

            // Clear the form or show a success message
            setName('');
            setCategory('');
            setFilePath('');
            setDescription('');
            setOwner('');
            setFileType('');
            alert('Asset created successfully!');
            navigate('/home');
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error submitting asset:', error);
            alert('Failed to create asset.');
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflowY: 'auto',
            }}
        >
            <div
                className="container"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#d3d3d3',
                    opacity: '90%',
                    marginTop: '5%',
                    marginBottom: '5%',
                }}
            >
                <h2 className="text-center">Upload an asset</h2>
                <form onSubmit={handleSubmit}>
                    {/* Asset Name Field */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Asset Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter asset name"
                        />
                    </div>

                    {/* Asset Type Field */}
                    <div className="mb-3">
                        <label htmlFor="assetType" className="form-label">
                            Asset Type
                        </label>
                        <select
                            id="assetType"
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select an Asset Type</option>
                            <option value="Branding">Branding</option>
                            <option value="Products">Products</option>
                            <option value="Events">Events</option>
                            <option value="Guides">Guides</option>
                            <option value="Operations">Operations</option>
                        </select>
                    </div>

                    {/* File Path Field */}
                    <div className="mb-3">
                        <label htmlFor="filePath" className="form-label">
                            File Path
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="filePath"
                            value={filePath}
                            onChange={(e) => setFilePath(e.target.value)}
                            placeholder="Enter file path"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a description"
                        />
                    </div>

                    {/* Owner Field */}
                    <div className="mb-3">
                        <label htmlFor="owner" className="form-label">
                            Owner
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="owner"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            placeholder="Enter owner name"
                        />
                    </div>

                    {/* File Type Field */}
                    <div className="mb-3">
                        <label htmlFor="fileType" className="form-label">
                            File Type
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fileType"
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}
                            placeholder="Enter file type (e.g., .png, .pdf)"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Upload
                    </button>
                </form>
            </div>

            <div
                className="container"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#d3d3d3',
                    opacity: '90%',
                }}
            >
                <h2 className="text-center">Mass upload assets</h2>
                <DownloadTemplateButton />
                <UploadExcelButton />
            </div>
        </div>
    );
};

export default AddAssetPage;
