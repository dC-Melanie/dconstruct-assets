import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAssets, deleteAsset } from '../Services/assetService';
import { Asset } from '../Types/Asset';
import '../styles.css';
import options from '../Options.png';
import downloadIcon from '../Download btn.png'; // Add a download icon
import DeleteIcon from '@mui/icons-material/Delete';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSortingVisible, setIsSortingVisible] = useState<boolean>(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null); // For the sidebar

    const handleSortToggle = () => {
        setIsSortingVisible(!isSortingVisible);
    };

    const handleAddClick = () => {
        navigate('/addasset');
    };

    const [option1, setOption1] = useState<string | null>(null);
    const [option2, setOption2] = useState<string | null>(null);
    const [option3, setOption3] = useState<string | null>(null);
    const [pressCount, setPressCount] = useState<number>(0);

    const [assets, setAssets] = useState<Asset[]>([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const assetsData = await getAllAssets();
                setAssets(assetsData);
            } catch (error) {
                setError('Could not load assets.');
            }
        };
        fetchAssets();
    }, [option1, option2, option3, pressCount]);


    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleDelete = async (filepath: string) => {
        try {
            const response = await deleteAsset(filepath);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to delete the image');
            }
            setPressCount(pressCount + 1);
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error; // Propagate error for handling in the component
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        // Create FormData object to send the file
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Send the file to the backend API endpoint
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`File uploaded successfully! File path: ${data.filePath}`);
            } else {
                setMessage('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error uploading the file.');
        }
    };


    return (
        <div className="homepage">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>All Assets</p>
                    <hr
                        style={{
                            borderTop: '4px solid #ff3300',
                            width: '100%',
                            margin: '0',
                        }}
                    />
                </div>
                <div>
                    <div className="input-group w-100 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter a keyword..."
                            aria-label="Search"
                            aria-describedby="button-addon2"
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                        >
                            Search
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                    accept="image/*"  // Optional: Restrict to image files only
                                />
                                <button type="submit">Search by Image</button>
                            </div>

                        </form>
                        <p>{message}</p>
                    </div>
                </div>

            </div>

            {/* Add Asset & Sort By */}
            <div className="d-flex align-items-center justify-content-end mb-3">
                <button
                    className="btn btn-dark me-2"
                    style={{ width: '120px', height: '40px' }}
                    onClick={handleAddClick}
                >
                    Add Asset
                </button>
                <button
                    className="btn btn-dark me-2"
                    style={{ width: '120px', height: '40px' }}
                    onClick={handleSortToggle}
                >
                    Sort By
                </button>
            </div>

            {/* Sorting Dropdown */}
            {isSortingVisible && (
                <div className="mt-3">
                    <ul className="nav justify-content-start">
                        {/* Dropdown options here */}
                    </ul>
                </div>
            )}

            {/* Asset Cards */}
            <div className="container justify-content-start ms-0">
                <div className="row justify-content-start">
                    {assets.map((asset) => (
                        <div
                            key={asset.id}
                            className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3"
                        >
                            <div
                                className="card"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                    overflow: 'hidden',
                                    maxWidth: '280px',
                                    margin: '0 auto',
                                    textAlign: 'center',
                                }}
                                onClick={() => setSelectedAsset(asset)} // Handle click for sidebar
                            >
                                <div className="card-body p-2">
                                    <h5
                                        className="card-title mb-2"
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#333',
                                            borderBottom: '1px solid #ddd',
                                            paddingBottom: '4px',
                                        }}
                                    >
                                        {asset.name}
                                    </h5>
                                    <div
                                        style={{
                                            height: '120px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#f9f9f9',
                                            borderRadius: '6px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <img
                                            src={asset.filePath}
                                            alt={asset.name}
                                            style={{
                                                objectFit: 'contain',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                        <img
                                            src={downloadIcon}
                                            alt="Download"
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = asset.filePath;
                                                link.download = asset.name || 'download';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }}
                                        />
                                        <DeleteIcon onClick={() => handleDelete(asset.filePath)} />

                                        <img
                                            src={options}
                                            alt="Delete"
                                            style={{
                                                width: '4px',
                                                height: '14px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar */}
            {selectedAsset && (
                <div
                    className="sidebar"
                    style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        height: '100%',
                        width: '320px',
                        backgroundColor: '#2d2d2d',
                        color: '#fff',
                        boxShadow: '-2px 0 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        zIndex: 1000,
                        overflowY: 'auto',
                    }}
                >
                    <button
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => setSelectedAsset(null)}
                    >
                        &times;
                    </button>
                    <div>
                        <img
                            src={selectedAsset.filePath}
                            alt={selectedAsset.name}
                            style={{
                                objectFit: 'contain',
                                maxWidth: '100%',
                                maxHeight: '150px',
                                borderRadius: '8px',
                                marginBottom: '20px',
                                backgroundColor: '#444',
                                padding: '10px',
                            }}
                        />
                        <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{selectedAsset.name}</h5>
                        <p><strong>File type:</strong> {selectedAsset.fileType}</p>
                        <p><strong>Owner:</strong> {selectedAsset.owner}</p>
                        <p><strong>Date added:</strong> {selectedAsset.date}</p>
                        <p style={{ marginBottom: '20px' }}><strong>Description:</strong> {selectedAsset.description}</p>

                        <button
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = selectedAsset.filePath;
                                link.download = selectedAsset.name;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#ff3300',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
