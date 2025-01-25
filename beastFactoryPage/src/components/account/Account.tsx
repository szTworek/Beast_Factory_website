import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import Navbar from "../Navbar.tsx";

const Account: React.FC = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar/>
            <h1>Twoje konto</h1>
        </div>
    );
};

export default Account;

