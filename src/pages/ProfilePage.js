import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import {getFlights, getUserInfo} from "../api";
import SimpleFlightCard from "../components/SimpleFlightCard";

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('information');
    const [user, setUser] = useState({name: '', email: '', surname: ''})
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUserInfo();
                setName(user.name)
                setSurname(user.surname)
                setEmail(user.email)
                setUser(user);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        getUserData();
    }, []);

    const handleSave = () => {
        updateUser(name, surname, email);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'information':
                return (
                    <div className="profile-info">
                        <div className="profile-item">
                            <label>Имя:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="profile-item">
                            <label>Фамилия:</label>
                            <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                        <div className="profile-item">
                            <label>Электронная почта:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="profile-button" onClick={handleSave}>Обновить</button>
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
                    {/*<li onClick={() => setActiveSection('space-map')}>Космическая карта</li>*/}
                    {/*<li onClick={() => setActiveSection('settings')}>Настройки</li>*/}
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
