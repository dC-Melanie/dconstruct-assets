import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAssets } from '../Services/assetService';
import { Asset } from '../Types/Asset';


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState<string>('Images');
    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName);
    }

    const handleAddClick = () => {
        navigate('/addasset');
    }

    const [option1, setOption1] = useState<string|null>(null);
    const [option2, setOption2] = useState<string|null>(null);
    const [option3, setOption3] = useState<string|null>(null);

    const [assets, setAssets] = useState<Asset[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const assetsData = await getAllAssets();
                setAssets(assetsData);
            } catch (error) {
                setError("Could not load assets.");
            }
        };
        fetchAssets();
    }, [option1, option2, option3]);


    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>All Assets</p>
                    <hr style={{ borderTop: '4px solid #ff3300', width: '100%', margin: '0' }} />
                </div>
                <div className="input-group mb-3 w-50">
                    <input type="text" className="form-control" placeholder="Enter a keyword..." aria-label="Search" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <p className="me-5" style={{ fontWeight: 'bold' }}>Sort By</p>
                <div>
                    <button className="btn btn-dark" style={{ width: "120px", height: "40px" }} onClick={handleAddClick}>Add asset</button>

                </div>
            </div>

            <ul className="nav justify-content-start">
                {/* Dropdown for Images */}
                <li className="nav-item me-4">
                    <div className="dropdown">
                        <button className="btn custom-btn dropdown-toggle" type="button" id="imagesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {option1 || 'Select Option'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="imagesDropdown">
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption1("Latest")}>Recency (Latest)</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption1("Earliest")}>Recency (Earliest)</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption1("Alphabetical")}>Alphabetical</button>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Dropdown for Videos */}
                <li className="nav-item me-4">
                    <div className="dropdown">
                        <button className="btn custom-btn dropdown-toggle" type="button" id="videosDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {option2 || 'Select File Type'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="videosDropdown">
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption2("PNG")}>PNG</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption2("JPG/JPEG")}>JPG/JPEG</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption2("SVG")}>SVG</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption2("PDF")}>PDF</button>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Dropdown for Files */}
                <li className="nav-item me-4">
                    <div className="dropdown">
                        <button className="btn custom-btn dropdown-toggle" type="button" id="filesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {option3||'Select Tag'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="filesDropdown">
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption3("PNG")}>File Option 1</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption3("PNG")}>File Option 2</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={() => setOption3("PNG")}>File Option 3</button>
                            </li>
                        </ul>
                    </div>
                </li></ul>
            <div className="container my-4">
                <div className="row">
                    {assets.map((asset) => (
                        <div key={asset.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-center border-bottom pb-2">{asset.name}</h5>
                                    <img
                                        src={asset.filePath}
                                        alt={asset.name}
                                        className="card-img-top"
                                        style={{ objectFit: 'contain', height: '100px' }}
                                    />
                                    <a href={asset.filePath} download className="d-block">
                                        <i
                                            className="bi bi-download" // Bootstrap icon class for the download icon
                                            style={{ fontSize: '15px', cursor: 'pointer', color: '#ff3300' }}
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

export default HomePage;