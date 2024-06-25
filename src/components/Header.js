import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

function Header() {
    let token = localStorage.getItem('token')
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo"><Link to="/">Space Travel Booking</Link></h1>
                {token ? <Link to="/me">Личный кабинет</Link> : <Link to="/login">Войти</Link>}
            </div>
        </header>
    );
}

export default Header;