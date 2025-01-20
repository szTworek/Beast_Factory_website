import React, { useEffect, useState } from "react";
import Product from "../ts/interfaces/Product";
import "../styles/ProductTile.css";
import { useNavigate } from "react-router-dom";

const ProductTile = (product: Product) => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (product.image) {
      const blob = product.image instanceof Blob ? product.image : new Blob([product.image], { type: "image/jpeg" }); // Adjust type if needed
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, []);

  const handleClick = () => {
    const slug = product.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/item/${slug}`, { state: { product } });
  };

  return (
    <>
      <div className="tile" onClick={() => handleClick()}>
        <img className="previewImage" src={`data:image/jpeg;base64,${product.image}`} alt={product.title.toString()}></img>
        <div className="title">{product.title}</div>
        <div className="price">{product.price}PLN</div>
      </div>
    </>
  );
};

export default ProductTile;
