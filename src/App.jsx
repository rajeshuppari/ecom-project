import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DataList from "./Components/DataList";
import CategoryFilter from "./Components/CategoryFilter";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    let fetchApi = fetch("http://localhost:8080/api/product");
    fetchApi
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });

    let fetchApi2 = fetch("http://localhost:8080/api/category");
    fetchApi2
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategory(data);
      });
  }, []);

  const handleSearchTerm = (e) => {
    setsearchTerm(e.target.value);
  };

  const handleCategory = (categoryId) => {
    setselectedCategory(categoryId ? Number(categoryId) : null);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  let filterProducts = products.filter((p) => {
    return (
      (selectedCategory ? p.category.id == selectedCategory : true) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  filterProducts.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    else return b.price - a.price;
  });

  return (
    <>
      <div id="navbar-content">
        <div>
          <CategoryFilter
            category={category}
            onSelect={handleCategory}
          ></CategoryFilter>
        </div>
        <div>
          <input
            type="text"
            placeholder="search for products"
            onChange={handleSearchTerm}
          />
        </div>
        <div>
          <select name="sort" onChange={handleSortChange}>
            <option value="asc">Sort by Price:low to high</option>
            <option value="desc">Sort by Price:high to low</option>
          </select>
        </div>
      </div>

      <div>
        {filterProducts.length ? (
          <DataList products={filterProducts}></DataList>
        ) : (
          <p>no products are avaliable</p>
        )}
        <br />
      </div>
    </>
  );
}

export default App;
