import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/Machines.css";
import Form from "react-bootstrap/Form";
import Product from "../ts/interfaces/Product";
import ProductTile from "./ProductTile";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function priceComparator(a: Product, b: Product) {
  return a.price - b.price;
}

function sortBy(items: Product[], option: String) {
  if (option == "descending") {
    return [...items].sort(priceComparator).reverse();
  } else if (option == "ascending") {
    return [...items].sort(priceComparator);
  }
  return [...items];
}

const filterByCategory = (items: Product[], category: string) => {
  if (category === "") {
    return items;
  } else {
    return items.filter((product) => product.brand === category);
  }
};

const Machines = () => {
  const [amount, setAmount] = useState(0);
  const [rawData, setrawData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<String[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let newData = rawData;
    const uniqueBrands = Array.from(new Set(rawData.map((product) => product.brand)));
    setCategory(uniqueBrands);

    const filter = searchParams.get("category");
    if (filter) {
      newData = filterByCategory(newData, filter);
    }
    const sort = searchParams.get("sort");
    if (sort) {
      newData = sortBy(newData, sort);
    }

    setProducts(newData);
  }, [rawData]);

  useEffect(() => {
    setAmount(products.length);
  }, [products]);

  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // setrawData(randomGymProducts);
      fetch("http://localhost:3000/api/items/category/Dumbells")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          return setrawData(data);
        });
      return "data";
    },
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const updateParams = (param: string, option: string) => {
    if (option == "" && searchParams.has(param)) {
      searchParams.delete(param);
      setSearchParams(searchParams);
    } else {
      setSearchParams((searchParams) => {
        searchParams.set(param, option);
        return searchParams;
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="section">Sprzęt siłowy</div>

        <div className="contentSelectionOptions">
          <Form.Select
            aria-label="Sortowanie"
            onChange={(e) => {
              const selected = e.target.value;
              setProducts(sortBy(products, selected));
              updateParams("sort", selected);
            }}
          >
            <option value="popularity">Popularne</option>
            <option value="descending">Cena Malejąco</option>
            <option value="ascending">Cena Rosnąco</option>
          </Form.Select>
          <Form.Select
            aria-label="Filter by category"
            onChange={(e) => {
              const selected = e.target.value;
              setProducts(filterByCategory(rawData, selected));
              updateParams("brand", selected);
            }}
          >
            <option value="">Wszystkie</option>
            {category.map((category) => (
              <option key={category.toString()} value={category.toString()}>
                {category}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="amount">Liczba produktów: {amount}</div>
        <div className="products">
          {products.map((product) => (
            <ProductTile key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Machines;
