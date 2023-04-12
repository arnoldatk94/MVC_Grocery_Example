import logo from "./logo.png";
import "./App.css";
import React from "react";
import SingleProduct from "./Components/SingleProduct";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const [openSingle, setOpenSingle] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const { loginWithRedirect } = useAuth0();

  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products`
    );
    console.log(initialAPICall.data);
    setProducts(initialAPICall.data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const toggleView = (product) => {
    setOpenSingle(!openSingle);
    setCurrentId(product.id);
  };

  return (
    <div className="App">
      <header className="App-header">
        {openSingle ? (
          <div>
            <SingleProduct toggle={toggleView} id={currentId} />
          </div>
        ) : (
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h3>Grocery Store</h3>
            <h6>Products</h6>
            <div className="products-container">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="product"
                    key={product.id}
                    onClick={() => toggleView(product)}
                  >
                    <h4>{product.name}</h4>
                    <h5>${product.price}</h5>
                  </div>
                ))
              ) : (
                <p>Failure</p>
              )}
            </div>
            <button>
              <Link to="/form">Add product</Link>
            </button>
            <button onClick={() => loginWithRedirect()}>Log In</button>
          </div>
        )}
      </header>
    </div>
  );
}
