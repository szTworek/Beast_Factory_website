import React, { useState } from "react";
import Navbar from "./Navbar";
import Product from "../ts/interfaces/Product";
import Item from "./Item";

const Machines = () => {
  const product: Product = {
    id: 5,
    title: "Siema kozak",
    description:
      "\
  Maszyna 2w1 na plecy i klatkę UR-U021 2.0\
  Maszyna 2w1 na plecy i klatkę UR-U021 2.0 to nowoczesne stanowisko ze stosem obciążeń, które zostało zaprojektowane tak, aby każdy użytkownik – od nowicjusza do zawodowego sportowca – mógł przeprowadzić efektywny trening górnych partii ciała. Maksymalne obciążenie 120 kg, nowoczesny system regulacji ramion i siedziska, perforowana tapicerka… Nasza maszyna na plecy 2w1 gwarantuje Ci niezrównany komfort ruchu bez utraty wydajności.\
  Dwufunkcyjna maszyna na klatkę i plecy to idealne rozwiązanie dla każdego, kto chce wypróbować szeroką gamę ćwiczeń na jednym urządzeniu i przy niewielkiej powierzchni użytkowej. Dzięki niej będziesz w stanie skoncentrować się na dwóch różnych partiach ciała – zarówno na mięśniach piersiowych, jak i mięśniach pleców.\
",
    category: "jedzenie",
    price: 123.99,
    discountPercentage: 10,
    stock: 190,
    brand: "razer",
    image: "///",
  };

  return (
    <>
      <Navbar />
      {/* <div>Machines</div> */}
      <Item {...product}></Item>
    </>
  );
};

export default Machines;
