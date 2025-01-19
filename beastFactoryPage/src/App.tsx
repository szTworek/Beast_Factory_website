import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import Footer from "./components/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.tsx";
import Machines from "./components/Machines";
import Weights from "./components/Weights";
import Boundles from "./components/Boundles";
import Search from "./components/Search.tsx";
import Account from "./components/account/Account.tsx";
import Basket from "./components/Basket.tsx";
import Login from "./components/account/Login.tsx"
import ProtectedRoute from "./components/account/ProtectedRoute.tsx";
import Register from "./components/account/Register.tsx";
import {AuthProvider} from "./components/account/AuthProvider.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/machines" element={<Machines />} />
          <Route path="/weights" element={<Weights />} />
          <Route path="/bundles" element={<Boundles />} />
          <Route path="/search" element={<Search />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />} />
            <Route
                path="/account"
                element={
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                }
            />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
