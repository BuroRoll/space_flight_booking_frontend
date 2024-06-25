import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import UserCabinet from "./pages/ProfilePage";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Header/>
            <div className="App">
                <Routes>
                    <Route path="/" exact element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/booking" element={<BookingPage/>}/>
                    <Route path="/me" element={<UserCabinet/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
