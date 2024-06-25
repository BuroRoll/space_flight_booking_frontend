import React, {useEffect, useState} from 'react';
import FlightCard from '../components/FlightCard';
import './BookingPage.css';
import {getFlights, login} from "../api";


// const flightsData = [
//     { id: 1, destination: 'Лунные приключения', price: '$10,000', date: '15 июля 2024', description: 'Путешествие на Луну с экскурсией и космическими активностями.', planetImage: 'https://www.gmik.ru/wp-content/uploads/2015/10/Full-Moon.jpg' },
//     { id: 2, destination: 'Марсианский отрыв', price: '$50,000', date: '30 августа 2024', description: 'Экспедиция на Марс с проживанием в космической базе.', planetImage: 'https://img.freepik.com/premium-photo/mars-planet-solar-system_297535-4529.jpg' },
//     { id: 3, destination: 'Романтика на Венере', price: '$100,000', date: '10 октября 2024', description: 'Путешествие к большому красному пятну и изучение атмосферы Юпитера.', planetImage: 'https://rg.ru/uploads/images/142/21/93/Depositphotos_126626300_l-2015.jpg' },
//     { id: 3, destination: 'Романтика на Венере', price: '$100,000', date: '10 октября 2024', description: 'Путешествие к большому красному пятну и изучение атмосферы Юпитера.', planetImage: 'https://rg.ru/uploads/images/142/21/93/Depositphotos_126626300_l-2015.jpg' },
//     { id: 3, destination: 'Романтика на Венере', price: '$100,000', date: '10 октября 2024', description: 'Путешествие к большому красному пятну и изучение атмосферы Юпитера.', planetImage: 'https://rg.ru/uploads/images/142/21/93/Depositphotos_126626300_l-2015.jpg' },
//     { id: 3, destination: 'Романтика на Венере', price: '$100,000', date: '10 октября 2024', description: 'Путешествие к большому красному пятну и изучение атмосферы Юпитера.', planetImage: 'https://rg.ru/uploads/images/142/21/93/Depositphotos_126626300_l-2015.jpg' },
//     { id: 3, destination: 'Романтика на Венере', price: '$100,000', date: '10 октября 2024', description: 'Путешествие к большому красному пятну и изучение атмосферы Юпитера.', planetImage: 'https://rg.ru/uploads/images/142/21/93/Depositphotos_126626300_l-2015.jpg' },
// ];

function BookingPage() {
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        const getFlightsData = async () => {
            try {
                const flightsData = await getFlights();
                console.log(flightsData)
                setFlights(flightsData);
            } catch (error) {
                console.error("Failed to fetch flights", error);
            }
        };

        getFlightsData();
    }, []);
    return (
        <div className="booking-page">
            <div className="flight-cards">
                {flights.map(flight => (
                    <FlightCard key={flight.id} flight={flight}/>
                ))}
            </div>
        </div>
    );
}

export default BookingPage;