import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.tsx";
import Machines from "./components/Machines";
import Weights from "./components/Weights";
import Boundles from "./components/Boundles";
import Search from "./components/Search.tsx";
import Account from "./components/Account.tsx";
import Basket from "./components/Basket.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/machines" element={<Machines />} />
        <Route path="/weights" element={<Weights />} />
        <Route path="/bundles" element={<Boundles />} />

        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
