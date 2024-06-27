import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [headerText, setHeaderText] = useState("Welcome to Space Travel Booking");

    const handleViewFlights = () => {
        navigate('/booking');
    };

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.querySelector('.info-section');
            const aboutPosition = aboutSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 2;

            if (aboutPosition < screenPosition) {
                aboutSection.classList.add('appear');
                setHeaderText("About Us");
            } else {
                aboutSection.classList.remove('appear');
                setHeaderText("Welcome to Space Travel Booking");
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="homepage">
            <div className="hero">
                <div className="content">
                    <h1>{headerText}</h1>
                    {headerText === "Welcome to Space Travel Booking" && (
                        <>
                            <img className="spaceman" src={'https://www.pngall.com/wp-content/uploads/5/Astronaut-Space-PNG-File.png'} alt={''}/>
                            <h2>Отправляйтесь в завораживающее путешествие между звезд!<br/> Бронируй билеты уже сейчас!</h2>
                            <button onClick={handleViewFlights} className="view-flights-button">
                                Забронировать сейчас
                            </button>

                        </>
                    )}
                </div>
            </div>
            <div className="info-section">
                <div className="info-content">
                    <h2>О нас</h2>
                    <p>Мы — ведущая компания в области космических путешествий, обеспечивающая незабываемые путешествия
                        за пределы атмосферы Земли.</p>
                    <p>Наши услуги включают в себя:</p>
                    <ul>
                        <li>Межпланетные полеты</li>
                        <li>Космический туризм</li>
                        <li>Исследовательские миссии</li>
                        <li>Романтические путешествия</li>
                        <li>Незабываемые развлечения для Вас и ваших друзей</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomePage;