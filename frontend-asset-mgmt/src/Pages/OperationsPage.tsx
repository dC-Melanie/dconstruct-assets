import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssetsByCategory } from '../Services/assetService';
import { Asset } from '../Types/Asset';
import DownloadTemplateButton from '../Components/downloadTemplate';

const OperationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState<string>('Images');
    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName);
    }

    const handleAddClick = () => {
        navigate('/addasset');
    }


    const [assets, setAssets] = useState<Asset[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const assetsData = await getAssetsByCategory("Operations");
                setAssets(assetsData);
            } catch (error) {
                setError("Could not load assets.");
            }
        };
        fetchAssets();
    }, []);


    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Operations</p>
                    <hr style={{ borderTop: '4px solid #ff3300', width: '100%', margin: '0' }} />
                </div>
                <div className="input-group mb-3 w-50">
                    <input type="text" className="form-control" placeholder="Enter a keyword..." aria-label="Search" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <p className="me-5" style={{ fontWeight: 'bold' }}>Categories</p>
                <div>
                    <button className="btn btn-dark" style={{ width: "120px", height: "40px" }} onClick={handleAddClick}>Add asset</button>                </div>
            </div>

            <ul className="nav justify-content-start ">
                <li className="nav-item me-4">
                    <button className={`btn custom-btn ${activeButton === 'Images' ? 'active' : ''}`} type="button" onClick={() => handleClick('Images')}>Images</button>
                </li>
                <li className="nav-item me-4">
                    <button className={`btn custom-btn ${activeButton === 'Videos' ? 'active' : ''}`} type="button" onClick={() => handleClick('Videos')}>Videos</button>
                </li>
                <li className="nav-item me-4">
                    <button className={`btn custom-btn ${activeButton === 'Files' ? 'active' : ''}`} type="button" onClick={() => handleClick('Files')}>Files</button>
                </li>
                <li className="nav-item">
                    <button className={`btn custom-btn ${activeButton === 'Folders' ? 'active' : ''}`} type="button" onClick={() => handleClick('Folders')}>Folders</button>
                </li>
            </ul>
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
                                    maxHeight: '150 px',
                                    margin: '0 auto',
                                    textAlign: 'center', // Ensure cards align with the header
                                }}
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
                                    <a
                                        href={asset.filePath}
                                        download
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <i
                                            className="bi bi-download"
                                            style={{
                                                fontSize: '18px',
                                                cursor: 'pointer',
                                                color: '#007bff',
                                            }}
                                        ></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OperationsPage;