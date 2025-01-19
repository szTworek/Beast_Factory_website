import React, {useState} from "react";
import Navbar from "../Navbar";
import "/src/styles/LoginForm.css";
import Form from "react-bootstrap/Form";
import {useAuth} from "./AuthProvider.tsx";
import {useNavigate} from "react-router-dom";
// import "/src/styles/style.css"


interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {

    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (!formData.email || !formData.password) {
            setErrorMessage('Proszę wypełnić wszystkie pola');
            return;
        }
        setIsLoggedIn(true); // Ustawiamy, że użytkownik jest zalogowany
        navigate('/account');

        //wysyłanie danych do API
        setErrorMessage('');
        console.log('Zalogowano:', formData);
    };

    return (
        <>
            <Navbar />
            <div className="loginForm">
                <h1>Zaloguj się</h1>
                <form className="Form" onSubmit={handleSubmit}>
                    <div>
                        <p>E-mail:</p>
                        <input
                            type="email"
                            name="email"
                            className="loginInput"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <p>Hasło:</p>
                        <input
                            type="password"
                            name="password"
                            className="loginInput"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {errorMessage && <p className="error">{errorMessage}</p>}

                    <button type="submit" className="loginButton">
                        Zaloguj się
                    </button>
                </form>
            </div>
        </>
    );
};
export default Login;
