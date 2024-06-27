import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import {getFlights, getUserInfo} from "../api";
import SimpleFlightCard from "../components/SimpleFlightCard";

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('information');
    const [user, setUser] = useState(null)
    // const user = {
    //     name: 'Иван Иванов',
    //     email: 'ivan@example.com',
    //     joined: '01-01-2023',
    //     bookings: [
    //         { id: 1, destination: 'Луна', date: '2023-05-01', description: 'Путешествие на Луну' },
    //         { id: 2, destination: 'Марс', date: '2023-07-15', description: 'Экспедиция на Марс' },
    //         { id: 3, destination: 'Международная космическая станция', date: '2023-10-30', description: 'Посещение МКС' }
    //     ]
    // };
    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUserInfo();
                console.log(user)
                setUser(user);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        getUserData();
    }, []);
    const renderSection = () => {
        switch (activeSection) {
            case 'information':
                return (
                    <div className="profile-info">
                        <div className="profile-item">
                            <label>Имя:</label>
                            {/*{user ? null : <span>{user.name}</span>}*/}

                        </div>
                        <div className="profile-item">
                            <label>Электронная почта:</label>
                            {/*{user ? null : <span>{user.email}</span>}*/}

                        </div>
                        {/*<div className="profile-item">*/}
                        {/*    <label>Дата регистрации:</label>*/}
                        {/*</div>*/}
                    </div>
                );
            case 'bookings':
                return (
                    <div className="profile-bookings">
                        <h2>История бронирований</h2>
                        {user.bookings.map(booking => (
                            <SimpleFlightCard key={booking.id} flight={booking}/>
                        ))}
                    </div>
                );
            case 'space-map':
                return <div className="profile-section">Космическая карта (в разработке)</div>;
            case 'settings':
                return <div className="profile-section">Настройки (в разработке)</div>;
            default:
                return null;
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="sidebar">
                <h2>Меню</h2>
                <ul>
                    <li onClick={() => setActiveSection('information')}>Информация</li>
                    <li onClick={() => setActiveSection('bookings')}>История бронирований</li>
                    <li onClick={() => setActiveSection('space-map')}>Космическая карта</li>
                    <li onClick={() => setActiveSection('settings')}>Настройки</li>
                </ul>
            </div>
            <div className="profile-container">
                <h1>Личный кабинет</h1>
                {renderSection()}
            </div>
        </div>
    );
};

export default ProfilePage;