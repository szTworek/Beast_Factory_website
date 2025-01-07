import React, { useState } from "react";
import Product from "../ts/interfaces/Product";
import "../styles/Item.css";

const Item: React.FC<Product> = ({ id, title, description, category, price, discountPercentage, stock, brand }) => {
  const [amount, setAmount] = useState(0);

  function increment() {
    setAmount((oldAmount) => oldAmount + 1);
  }
  function decrement() {
    setAmount((oldAmount) => Math.max(oldAmount - 1, 0));
  }

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <>
      <div className="product">
        <div className="top">
          <div className="gallery">
            <img className="mainImage" src={images[0].original} alt="" />
            {images.slice(1).map((image) => (
              <img className="extraImage" src={image.original} alt="" />
            ))}
          </div>
          <div className="details">
            <div className="title">{title}</div>
            <div className="price">{price} PLN</div>
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
            <div className="description">{description}</div>

            <span className="secondary">Specyfikacja</span>
            <div className="description">jakaś tabelka ni</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
