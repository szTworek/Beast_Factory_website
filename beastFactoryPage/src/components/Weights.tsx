import React, { useState } from "react";
import Navbar from "./Navbar";
import "../styles/Weights.css";
import Form from "react-bootstrap/Form";
import Product from "../ts/interfaces/Product";
import ProductTile from "./ProductTile";

const Weights = () => {
  const [amount, setAmount] = useState(0);
  const [products, setProducts] = useState<Product[]>(randomGymProducts);

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="section">Sprzęt siłowy</div>

        <div className="contentSelectionOptions">
          <Form.Select aria-label="Default select example">
            <option>Cena malejąco</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Form.Select aria-label="Default select example">
            <option>Wszystkie</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>

        <div className="products">
          <div className="amount">Liczba produktów: {amount}</div>
          {products.map((product) => (
            <ProductTile key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Weights;

const randomGymProducts: Product[] = [
  {
    id: 1,
    title: "Dumbbell Set",
    description: "A set of adjustable dumbbells for strength training.",
    category: "Strength Training",
    price: 49.99,
    discountPercentage: 10,
    stock: 25,
    brand: "IronFit",
    image: "https://example.com/dumbbell.jpg",
  },
  {
    id: 2,
    title: "Yoga Mat",
    description: "A non-slip yoga mat for home and studio use.",
    category: "Yoga & Pilates",
    price: 19.99,
    discountPercentage: 5,
    stock: 50,
    brand: "ZenLife",
    image: "https://example.com/yogamat.jpg",
  },
  {
    id: 3,
    title: "Resistance Bands",
    description: "Set of resistance bands for muscle toning.",
    category: "Strength Training",
    price: 14.99,
    discountPercentage: 8,
    stock: 30,
    brand: "FlexBand",
    image: "https://example.com/resistancebands.jpg",
  },
  {
    id: 4,
    title: "Kettlebell",
    description: "20-pound kettlebell for versatile workouts.",
    category: "Strength Training",
    price: 39.99,
    discountPercentage: 12,
    stock: 15,
    brand: "PowerCore",
    image: "https://example.com/kettlebell.jpg",
  },
  {
    id: 5,
    title: "Treadmill",
    description: "Foldable treadmill with multiple speed settings.",
    category: "Cardio",
    price: 499.99,
    discountPercentage: 20,
    stock: 5,
    brand: "RunPro",
    image: "https://example.com/treadmill.jpg",
  },
  {
    id: 6,
    title: "Jump Rope",
    description: "Adjustable jump rope for cardio workouts.",
    category: "Cardio",
    price: 9.99,
    discountPercentage: 15,
    stock: 100,
    brand: "SpeedyFit",
    image: "https://example.com/jumprope.jpg",
  },
  {
    id: 7,
    title: "Pull-Up Bar",
    description: "Doorway pull-up bar for upper body workouts.",
    category: "Strength Training",
    price: 29.99,
    discountPercentage: 10,
    stock: 20,
    brand: "GripStrong",
    image: "https://example.com/pullupbar.jpg",
  },
  {
    id: 8,
    title: "Exercise Ball",
    description: "Stability ball for core and balance exercises.",
    category: "Yoga & Pilates",
    price: 24.99,
    discountPercentage: 10,
    stock: 40,
    brand: "CoreBalance",
    image: "https://example.com/exerciseball.jpg",
  },
  {
    id: 9,
    title: "Foam Roller",
    description: "High-density foam roller for muscle recovery.",
    category: "Recovery",
    price: 19.99,
    discountPercentage: 12,
    stock: 35,
    brand: "RecoverPro",
    image: "https://example.com/foamroller.jpg",
  },
  {
    id: 10,
    title: "Weight Bench",
    description: "Adjustable weight bench for home gym use.",
    category: "Strength Training",
    price: 149.99,
    discountPercentage: 15,
    stock: 10,
    brand: "StrongBench",
    image: "https://example.com/weightbench.jpg",
  },
];
