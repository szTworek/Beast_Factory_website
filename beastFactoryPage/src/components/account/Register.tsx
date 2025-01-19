import React, { useState } from "react";
import Navbar from "../Navbar";
import "/src/styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
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

        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setErrorMessage("Proszę wypełnić wszystkie pola");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Hasła nie są takie same");
            return;
        }

        try {
            const response = await fetch("http://localhost:3007/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (response.ok) {
                setSuccessMessage("Konto zostało pomyślnie utworzone!");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Nieudana rejestracja");
            }
        } catch (error) {
            console.error("Błąd podczas łączenia z backendem:", error);
            setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
    };

    return (
        <>

            <div className="loginForm">
                <h1>Zarejestruj się</h1>
                <form className="Form" onSubmit={handleSubmit}>
                    <p>Imię:</p>
                    <input
                        className="loginInput"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Nazwisko:</p>
                    <input
                        className="loginInput"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                    <p>E-mail:</p>
                    <input
                        className="loginInput"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Hasło:</p>
                    <input
                        className="loginInput"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Powtórz hasło:</p>
                    <input
                        className="loginInput"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />

                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}

                    <button type="submit" className="loginButton">
                        Utwórz konto
                    </button>
                </form>
                <p className={"registerText"}>Masz już konto?</p>
                <button className="loginButton" onClick={() => navigate("/login")}>
                    Zaloguj się
                </button>
            </div>
        </>
    );
};

export default Register;
