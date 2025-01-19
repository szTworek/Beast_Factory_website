import React from "react";
import Navbar from "../Navbar";
import "/src/styles/LoginForm.css";
import Form from "react-bootstrap/Form";
// import "/src/styles/style.css"

export const Register: React.FC = () => {
    return (
        <>
            <Navbar/>
            <div className="loginForm">

                <h1>Zarejestruj się</h1>
                <Form className={"Form"}>
                    <p>Imię:</p>
                    <input className={"loginInput"}/>
                    <p>Nazwisko:</p>
                    <input className={"loginInput"}/>
                    <p>E-mail:</p>
                    <input className={"loginInput"}/>
                    <p>Hasło:</p>
                    <input className={"loginInput"}/>
                    <p>Powtórz hasło:</p>
                    <input className={"loginInput"}/>
                </Form>

                <button className={"loginButton"}>Utwórz konto</button>
            </div>
        </>
    );
};
export default Register;