import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {login, register} from '../api';
import './LoginPage.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerSurname, setRegisterSurname] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLoginSubmit = async e => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.access_token);
            navigate('/booking');
        } catch (error) {
            setError(error.detail || 'An error occurred');
        }
    };

    const handleRegisterSubmit = async e => {
        e.preventDefault();
        if (registerPassword !== registerConfirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const data = await register(registerEmail, registerPassword, registerName, registerSurname);
            localStorage.setItem('token', data.access_token);
            navigate('/booking');
        } catch (error) {
            setError(error.detail || 'An error occurred');
        }
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        setError(null);
    };

    if (false) {
        return (
            <Navigate to="/profile/main"/>
        );
    } else {
        return (
            <div>
                <div id='left'>
                    <div className='block'>
                    </div>
                </div>
                <div id='right'>
                    <div className='block right_block'>
                        <div><h1>{isRegistering ? 'Регистрация' : 'Вход в аккаунт'}</h1></div>
                        <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}
                              className="login_form">
                            {isRegistering ? (
                                <>
                                    <div>
                                        <label htmlFor='register_email_input' className='label_login'>Электронная
                                            почта</label>
                                        <input id='register_email_input' className="login_inputs" type="text"
                                               placeholder="Введите адрес электронной почты"
                                               onChange={e => setRegisterEmail(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor='register_name_input' className='label_login'>Ваше имя</label>
                                        <input id='register_name_input' className="login_inputs" type="text"
                                               placeholder="Введите ваше имя"
                                               onChange={e => setRegisterName(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor='register_surname_input' className='label_login'>Ваша фамилия</label>
                                        <input id='register_surname_input' className="login_inputs" type="text"
                                               placeholder="Введите вашу фамилию"
                                               onChange={e => setRegisterSurname(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor='register_password_input' className='label_login'>Пароль</label>
                                        <input id='register_password_input' className="login_inputs" type="password"
                                               placeholder="Введите пароль"
                                               onChange={e => setRegisterPassword(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor='register_confirm_password_input' className='label_login'>Подтвердите
                                            пароль</label>
                                        <input id='register_confirm_password_input' className="login_inputs"
                                               type="password"
                                               placeholder="Подтвердите пароль"
                                               onChange={e => setRegisterConfirmPassword(e.target.value)}/>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor='email_input' className='label_login'>Электронная почта</label>
                                        <input id='email_input' className="login_inputs" type="text"
                                               placeholder="Введите адрес электронной почты"
                                               onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor='password_input' className='label_login'>Пароль</label>
                                        <input id='password_input' className="login_inputs" type="password"
                                               placeholder="Введите пароль"
                                               onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                </>
                            )}
                            {error &&
                                <div className="error_element">
                                    <div>{error}</div>
                                </div>
                            }

                            <div>
                                <button className="login_btn"
                                        type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>
                            </div>
                        </form>
                        <div className='register_login_block'>
                            <div>{isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}</div>
                            <div>
                                <button className="toggle_btn" onClick={toggleForm}>
                                    {isRegistering ? 'Войти' : 'Зарегистрироваться'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;