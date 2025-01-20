import React, { useEffect, useState } from "react";
import Product from "../ts/interfaces/Product";
import "../styles/Item.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

interface LocationState {
  state: {
    product: Product;
  };
}
const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};

const Item = () => {
  const { id } = useParams();
  const location = useLocation() as LocationState;
  const navigate = useNavigate();
  const product = location.state?.product;

  const [amount, setAmount] = useState(0);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (product.image) {
      const blob = product.image instanceof Blob ? product.image : new Blob([product.image], { type: "image/jpeg" }); // Adjust type if needed
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, []);

  function increment() {
    setAmount((oldAmount) => oldAmount + 1);
  }
  function decrement() {
    setAmount((oldAmount) => Math.max(oldAmount - 1, 0));
  }

  // const images = [
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  // ];

  if (!product) {
    return (
      <div>
        <h2>No product found!</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product">
        <div className="top">
          <div className="gallery">
            <img className="mainImage" src={`data:image/jpeg;base64,${product.image}`} alt="" />
            {/* {images.slice(1).map((image) => (
              <img key={generateKey(image.original)} className="extraImage" src={image.original} alt="" />
            ))} */}
          </div>
          <div className="details">
            <div className="title">{product.title}</div>
            <div className="price">{product.price} PLN</div>
            <div className="cartOptions">
              <div className="amountPicker">
                <div id="remove" onClick={decrement}>
                  -
                </div>
                <div id="amount">{amount}</div>
                <div id="add" onClick={increment}>
                  +
                </div>
              </div>
              <button id="addToCart">Dodaj do koszyka</button>
            </div>
            <span className="secondary">Opis</span>
            <div className="description">{product.description}</div>

            <span className="secondary">Specyfikacja</span>
            <div className="description">jakaś tabelka ni</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
