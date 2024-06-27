import axios from 'axios';

const API_URL = 'https://buroroll-spaceflightbooking-494b.twc1.net';
// const API_URL = 'http://127.0.0.1:8000';

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

export const createBooking = async (destination, price, flight_id, date) => {
    let token = localStorage.getItem('token')
    try {
        const response = await api.post('/bookings/',
            {
                'destination': destination,
                'price': price,
                'flight_id': flight_id,
                'date': date
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

export const updateUser = async (name, surname, email) => {
    let token = localStorage.getItem('token')
    try {
        const response = await api.put('/users/me',
            {
                'name': name,
                'surname': surname,
                'email': email,
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

