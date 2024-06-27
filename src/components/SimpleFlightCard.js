import React, {useState} from 'react';
import './SimpleFlightCard.css';

function SimpleFlightCard({flight}) {
    const {destination, price, date, description, planet_image} = flight;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        // setIsModalOpen(true);
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cancelBooking = () => {

    }

    return (
        <>
            <div className="simple-flight-card" onClick={handleOpenModal}>
                <div className="simple-flight-details">
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
                        <button className="modal-close" onClick={handleCloseModal}>Закрыть</button>
                        <button className="cancel-book-button" onClick={cancelBooking}>Отменить бронь</button>
                    </div>
                </div>
            )}
        </>

    );
}

export default SimpleFlightCard;
