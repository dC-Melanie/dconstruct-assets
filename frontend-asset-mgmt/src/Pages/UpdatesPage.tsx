import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const pptxPath = '/assets/TemplateDeck.pptx';

const UpdatesPage: React.FC = () => {const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const updates = [
        {
            title: "dConstruct Slide Template",
            description: "Use this template base for all current and upcoming presentation slides.",
            updateDate: "Updated 11/10/2024",
        },
        {
            title: "dConstruct Slide Template",
            description: "Use this template base for all current and upcoming presentation slides.",
            updateDate: "Updated 11/10/2024",
        },
        {
            title: "dConstruct Slide Template",
            description: "Use this template base for all current and upcoming presentation slides.",
            updateDate: "Updated 11/10/2024",
        },
    ];

    const items = ['Content 1', 'Content 2', 'Content 3', 'Content 4'];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
        setTimeout(() => setTransitioning(false), 500);
    }

    const handleNext = () => {
        setTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setTimeout(() => setTransitioning(false), 500);
    }

    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get('http://localhost:8080/');
                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching message:', error);
                setMessage('Error fetching message');
            }
        };

        fetchMessage();
    }, []);

    return (
        <div style={{ flexGrow: 1 }}>
            <div>
                <header className="bg-light border-bottom mb-4">
                    <div className="container">
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">

                                <div className="carousel-item active">
                                    <img src="https://i.pinimg.com/originals/47/1a/f4/471af46519ed5bea2b0002e8c034b51b.jpg" className="d-block w-100" alt="..." style={{ height: '400px', borderRadius: '15px' }} />
                                    <div className="carousel-caption">
                                        <h5>First slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-tech-robot-hand-business-banner-image_162870.jpg" className="d-block w-100" alt="..." style={{ height: '400px', borderRadius: '15px' }} />
                                    <div className="carousel-caption">
                                        <h5>Second slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </div> </div>
                                <div className="carousel-item">
                                    <img src="https://png.pngtree.com/background/20210710/original/pngtree-blue-face-robot-technology-banner-poster-picture-image_1052453.jpg" className="d-block w-100" alt="..." style={{ height: '400px', borderRadius: '15px' }} />
                                    <div className="carousel-caption">
                                        <h5>Third slide label</h5>
                                        <p>Some representative placeholder content for the first slide.</p>
                                    </div></div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div>
                        <h1>Message from Crow Backend</h1>
                        <p>{message}</p>
                    </div>
                    {updates.map((asset, index) => (

                        <div className="card mb-4" style={{}}>
                            <div className="card-header">
                                <div className="small text-muted">{asset.title}</div>
                            </div>
                            <div className="card-body">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', }}>
                                    <div className="small text-muted">{asset.description}</div>
                                    <div className="small text-muted">{asset.updateDate}</div>

                                </div>

                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>

    );
};

export default UpdatesPage;
