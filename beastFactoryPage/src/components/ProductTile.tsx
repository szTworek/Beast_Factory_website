import React from "react";
import Product from "../ts/interfaces/Product";
import "../styles/ProductTile.css";

const ProductTile: React.FC<Product> = ({ id, title, description, category, price, discountPercentage, stock, brand }) => {
  return (
    <div className="tile">
      <div className="title">{title}</div>
    </div>
  );
};

export default ProductTile;
