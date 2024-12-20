import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssetsByCategory } from '../Services/assetService';
import { Asset } from '../Types/Asset';
import DownloadTemplateButton from '../Components/downloadTemplate';

const EventsPage: React.FC = () => {
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
                const assetsData = await getAssetsByCategory("Events");
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
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Events</p>
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EventsPage;