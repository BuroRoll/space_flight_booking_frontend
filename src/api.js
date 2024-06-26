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

export const getFlights = async () => {
    try {
        const response = await api.get('/flights/');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
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
//
// export const createBooking = async (booking, token) => {
//     try {
//         const response = await api.post('/bookings/', booking, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };
