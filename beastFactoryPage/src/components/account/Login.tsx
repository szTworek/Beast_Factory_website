import React, { useState } from "react";
import Navbar from "../Navbar";
import "/src/styles/LoginForm.css";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setErrorMessage("Proszę wypełnić wszystkie pola");
            return;
        }

        try {
            const response = await fetch("http://localhost:3007/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsLoggedIn(true);
                navigate("/account");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Nieudana próba logowania");
            }
        } catch (error) {
            console.error("Błąd podczas łączenia z backendem:", error);
            setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
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
                <p className={"registerText"}>Nie masz konta?</p>
                <button className="loginButton" onClick={() => navigate("/register")}>
                    Zarejestruj się
                </button>
            </div>
        </>
    );
};

export default Login;

