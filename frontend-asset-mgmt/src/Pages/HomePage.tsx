import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState<string>('Images');
    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName);
    }

    const handleAddClick = ()=>{
        navigate('/addasset');
    }


    return (
        <div>
            <div className="d-flex align-items-center justify-content-end">
                <div className="input-group mb-3 w-50">
                    <input type="text" className="form-control" placeholder="Enter a keyword..." aria-label="Search" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <p className="me-5" style={{fontWeight: 'bold'}}>Categories</p>
                <button className="btn btn-dark" style={{ width: "120px", height: "40px"}} onClick={handleAddClick}>Add asset</button>
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

        </div>
    )
}

export default HomePage;