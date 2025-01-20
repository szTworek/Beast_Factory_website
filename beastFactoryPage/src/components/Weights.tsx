import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/Weights.css";
import Form from "react-bootstrap/Form";
import Product from "../ts/interfaces/Product";
import ProductTile from "./ProductTile";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

function priceComparator(a: Product, b: Product) {
  return a.price - b.price;
}

function sortBy(items: Product[], option: string, category: string) {
  console.log(items);
  const filtered = filterByCategory(items, category);
  console.log(filtered);
  if (option == "descending") {
    console.log([...filtered].sort(priceComparator).reverse());
    return [...filtered].sort(priceComparator).reverse();
  } else if (option == "ascending") {
    return [...filtered].sort(priceComparator);
  }
  return [...filtered];
}

const filterByCategory = (items: Product[], category: string) => {
  if (category === "") {
    return items;
  } else {
    return items.filter((product) => product.brand === category);
  }
};

const Weights = () => {
  const [amount, setAmount] = useState(0);
  const [rawData, setrawData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<String[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    let newData = rawData;
    const uniqueBrands = Array.from(new Set(rawData.map((product) => product.brand)));
    setCategory(uniqueBrands);

    const filter = searchParams.get("category");
    if (filter) {
      setSelectedBrand(filter);
      newData = filterByCategory(newData, filter);
    }
    const sort = searchParams.get("sort");
    if (sort) {
      newData = sortBy(newData, sort, selectedBrand);
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
      fetch("http://localhost:3000/api/items/category/Machines")
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
              setProducts(sortBy(rawData, selected, selectedBrand));
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
              setSelectedBrand(selected);
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

export default Weights;

// const randomGymProducts: Product[] = [
//   {
//     id: 1,
//     title: "Dumbbell Set",
//     description: "A set of adjustable dumbbells for strength training.",
//     category: "Strength Training",
//     price: 49.99,
//     discountPercentage: 10,
//     stock: 25,
//     brand: "IronFit",
//     image: "https://example.com/dumbbell.jpg",
//   },
//   {
//     id: 2,
//     title: "Yoga Mat",
//     description: "A non-slip yoga mat for home and studio use.",
//     category: "Yoga & Pilates",
//     price: 19.99,
//     discountPercentage: 5,
//     stock: 50,
//     brand: "ZenLife",
//     image: "https://example.com/yogamat.jpg",
//   },
//   {
//     id: 3,
//     title: "Resistance Bands",
//     description: "Set of resistance bands for muscle toning.",
//     category: "Strength Training",
//     price: 14.99,
//     discountPercentage: 8,
//     stock: 30,
//     brand: "FlexBand",
//     image: "https://example.com/resistancebands.jpg",
//   },
//   {
//     id: 4,
//     title: "Kettlebell",
//     description: "20-pound kettlebell for versatile workouts.",
//     category: "Strength Training",
//     price: 39.99,
//     discountPercentage: 12,
//     stock: 15,
//     brand: "PowerCore",
//     image: "https://example.com/kettlebell.jpg",
//   },
//   {
//     id: 5,
//     title: "Treadmill",
//     description: "Foldable treadmill with multiple speed settings.",
//     category: "Cardio",
//     price: 499.99,
//     discountPercentage: 20,
//     stock: 5,
//     brand: "RunPro",
//     image: "https://example.com/treadmill.jpg",
//   },
//   {
//     id: 6,
//     title: "Jump Rope",
//     description: "Adjustable jump rope for cardio workouts.",
//     category: "Cardio",
//     price: 9.99,
//     discountPercentage: 15,
//     stock: 100,
//     brand: "SpeedyFit",
//     image: "https://example.com/jumprope.jpg",
//   },
//   {
//     id: 7,
//     title: "Pull-Up Bar",
//     description: "Doorway pull-up bar for upper body workouts.",
//     category: "Strength Training",
//     price: 29.99,
//     discountPercentage: 10,
//     stock: 20,
//     brand: "GripStrong",
//     image: "https://example.com/pullupbar.jpg",
//   },
//   {
//     id: 8,
//     title: "Exercise Ball",
//     description: "Stability ball for core and balance exercises.",
//     category: "Yoga & Pilates",
//     price: 24.99,
//     discountPercentage: 10,
//     stock: 40,
//     brand: "RecoverPro",
//     image: "https://example.com/exerciseball.jpg",
//   },
//   {
//     id: 9,
//     title: "Foam Roller",
//     description: "High-density foam roller for muscle recovery.",
//     category: "Recovery",
//     price: 19.99,
//     discountPercentage: 12,
//     stock: 35,
//     brand: "RecoverPro",
//     image: "https://example.com/foamroller.jpg",
//   },
//   {
//     id: 11,
//     title: "Weight Bench",
//     description: "Adjustable weight bench for home gym use.",
//     category: "Strength Training",
//     price: 149.99,
//     discountPercentage: 15,
//     stock: 10,
//     brand: "GripStrong",
//     image: "https://example.com/weightbench.jpg",
//   },
//   {
//     id: 12,
//     title: "Weight Bench",
//     description: "Adjustable weight bench for home gym use.",
//     category: "Strength Training",
//     price: 89.99,
//     discountPercentage: 15,
//     stock: 10,
//     brand: "GripStrong",
//     image: "https://example.com/weightbench.jpg",
//   },
//   {
//     id: 13,
//     title: "Roller",
//     description: "Adjustable weight bench for home gym use.",
//     category: "Strength Training",
//     price: 49.99,
//     discountPercentage: 15,
//     stock: 10,
//     brand: "PowerCore",
//     image: "https://example.com/weightbench.jpg",
//   },
//   {
//     id: 14,
//     title: "Barebell",
//     description: "Adjustable weight bench for home gym use.",
//     category: "Strength Training",
//     price: 123.99,
//     discountPercentage: 15,
//     stock: 10,
//     brand: "PowerCore",
//     image: "https://example.com/weightbench.jpg",
//   },
// ];
