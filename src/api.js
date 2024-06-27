import axios from 'axios';

const API_URL = 'https://buroroll-spaceflightbooking-494b.twc1.net';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const register = async (email, password, name, surname) => {
    try {
        const response = await api.post(
            '/register',
            {email, password, name, surname}
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (email, password) => {
    try {
        const response = await api.post(
            '/login',
            {email: email, password: password}
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// export const getFlights = async () => {
//     try {
//         const response = await api.get('/flights/');
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

export const getFlights = async () => {
    const response = await fetch(`${API_URL}/flights/`);
    if (!response.ok) {
        throw new Error('Failed to fetch flights');
    }
    return await response.json();
};

export const createFlight = async (flight) => {
    const response = await fetch(`${API_URL}/flights/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flight),
    });
    if (!response.ok) {
        throw new Error('Failed to create flight');
    }
    return await response.json();
};

// export const createBooking = async (booking) => {
//     const response = await fetch(`${API_URL}/bookings/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(booking),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to create booking');
//     }
//     return await response.json();
// };

export const getUserInfo = async () => {
    let token = localStorage.getItem('token')
    try {
        const response = await api.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createBooking = async (destination, price, flight_id) => {
    let token = localStorage.getItem('token')
    try {
        const response = await api.post('/bookings/',
            {
                'destination': destination,
                'price': price,
                'flight_id': flight_id
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
