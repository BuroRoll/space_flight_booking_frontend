// FlightCard.jsx
import React, {useState} from 'react';
import './FlightCard.css';
import {createBooking} from "../api";
import {useNavigate} from "react-router-dom";

function FlightCard({flight}) {
    const {id, destination, price, date, description, planet_image} = flight;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        additional_data: '',
        date: ''
    });
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsBookingFormOpen(false); // Закрываем форму бронирования при закрытии модального окна
    };

    const handleOpenBookingForm = () => {
        let token = localStorage.getItem('token')
        if (token) {
            setIsBookingFormOpen(true);
        } else {
            navigate('/login');
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createBooking(destination, price, id, date).then(r => {
            console.log(r)
            setIsBookingFormOpen(false);
        })
    };

    return (
        <>
            <div className="flight-card" onClick={handleOpenModal}>
                <div className="image-container">
                    <img src={planet_image} alt={`${destination} planet`}/>
                </div>
                <div className="flight-details">
                    <h3>{destination}</h3>
                    <p>Цена: {price}</p>
                    <p>Дата: {date}</p>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Подробности рейса</h2>
                        <p>Направление: {flight.destination}</p>
                        <p>Дата: {flight.date}</p>
                        <p>Описание: {flight.description}</p>
                        <button className="modal-close" onClick={handleCloseModal}>Закрыть</button>
                        {!isBookingFormOpen ? (
                            <button className="book-button" onClick={handleOpenBookingForm}>Забронировать</button>
                        ) : (
                            <form onSubmit={handleSubmit} className="booking-form">
                                <div>
                                    <label>Имя:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Телефон:</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Дополнительные пожелания к полету:</label>
                                    <input
                                        type="text"
                                        name="additional_data"
                                        value={formData.additional_data}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit">Забронировать</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default FlightCard;
