import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAssets } from '../Services/assetService';
import { Asset } from '../Types/Asset';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSortingVisible, setIsSortingVisible] = useState<boolean>(false);

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
        <div>
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
                <div className="input-group w-50">
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
                        {/* Dropdown for Images */}
                        <li className="nav-item me-4">
                            <div className="dropdown">
                                <button
                                    className="btn custom-btn dropdown-toggle"
                                    type="button"
                                    id="imagesDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {option1 || 'Select Option'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="imagesDropdown"
                                >
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() =>
                                                setOption1('Latest')
                                            }
                                        >
                                            Recency (Latest)
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() =>
                                                setOption1('Earliest')
                                            }
                                        >
                                            Recency (Earliest)
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() =>
                                                setOption1('Alphabetical')
                                            }
                                        >
                                            Alphabetical
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Dropdown for Videos */}
                        <li className="nav-item me-4">
                            <div className="dropdown">
                                <button
                                    className="btn custom-btn dropdown-toggle"
                                    type="button"
                                    id="videosDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {option2 || 'Select File Type'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="videosDropdown"
                                >
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setOption2('PNG')}
                                        >
                                            PNG
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() =>
                                                setOption2('JPG/JPEG')
                                            }
                                        >
                                            JPG/JPEG
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setOption2('SVG')}
                                        >
                                            SVG
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setOption2('PDF')}
                                        >
                                            PDF
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Dropdown for Files */}
                        <li className="nav-item me-4">
                            <div className="dropdown">
                                <button
                                    className="btn custom-btn dropdown-toggle"
                                    type="button"
                                    id="filesDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {option3 || 'Select Tag'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="filesDropdown"
                                >
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setOption3('Option1')}
                                        >
                                            File Option 1
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setOption3('Option2')}
                                        >
                                            File Option 2
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setOption3('Option3')}
                                        >
                                            File Option 3
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
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
                                    maxWidth: '280px', // Reduce the card width
                                    margin: '0 auto', // Center-align cards
                                }}
                            >
                                <div className="card-body p-2">
                                    <h5
                                        className="card-title mb-2"
                                        style={{
                                            fontSize: '14px', // Smaller font size for titles
                                            fontWeight: '600',
                                            color: '#333',
                                            borderBottom: '1px solid #ddd',
                                            paddingBottom: '4px',
                                            textAlign: 'left', // Align text to the left
                                        }}
                                    >
                                        {asset.name}
                                    </h5>
                                    <div
                                        style={{
                                            height: '120px', // Reduced image container height
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
                                    <div
                                        style={{
                                            textAlign: 'left', // Align download button to the left
                                        }}
                                    >
                                        <a
                                            href={asset.filePath}
                                            download
                                            style={{
                                                display: 'inline-block',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <i
                                                className="bi bi-download"
                                                style={{
                                                    fontSize: '18px', // Slightly smaller icon size
                                                    cursor: 'pointer',
                                                    color: '#007bff',
                                                }}
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
