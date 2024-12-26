import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAssets } from '../Services/assetService';
import { Asset } from '../Types/Asset';
import '../styles.css';

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
    }, [option1, option2, option3]);

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
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search all assets..."
                        aria-label="Search"
                    />
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
            <div className="container my-4">
                <div className="row">
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
                                    maxHeight: '150px',
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
                        width: '300px',
                        backgroundColor: '#fff',
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
                                maxHeight: '100%',
                                borderRadius: '8px',
                                marginBottom: '20px',
                            }}
                        />
                        <h5>{selectedAsset.name}</h5>
                        <p>alt={selectedAsset.description}</p>
                        <p>
                            <strong>Category:</strong> {selectedAsset.category}
                        </p>
                        <p>
                            <strong>Owner:</strong> {selectedAsset.owner}
                        </p>
                        <p>
                            <strong>Comments:</strong> {selectedAsset.comments}
                        </p>
                        <p>
                            <strong>Date:</strong>{' '}
                            {new Date(selectedAsset.date).toLocaleString()}
                        </p>
                        <p>
                            <strong>File Type:</strong> {selectedAsset.fileType}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
