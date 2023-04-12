import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0, user, isAuthenticated } from "@auth0/auth0-react";

export default function AddProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [accessToken, setAccessToken] = useState("");
  const {
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  const checkUser = async () => {
    if (isAuthenticated) {
      let token = await getAccessTokenSilently();
      console.log("token", token);
      console.log(user);
      setAccessToken(token);
    } else {
      loginWithRedirect();
    }
  };

  useEffect(() => {
    checkUser();
    console.log(accessToken);
  }, []);

  const createNewProduct = async (name, price) => {
    let product = {
      name,
      price,
    };
    // let token = await getAccessTokenSilently({
    //   authorizationParams: {
    //     audience: "https://myApp/api",
    //     scope: "read:current_user update:current_user_metadata",
    //   },
    // });
    let token = await getAccessTokenSilently();
    console.log("Access token in createNewProd", token);
    await axios.post(`${process.env.REACT_APP_API_SERVER}/products`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const submit = () => {
    createNewProduct(name, price);
    setName("");
    setPrice("");
  };

  return (
    <div className="App-header">
      <button>
        <Link to="/">Home</Link>
      </button>

      <h3>Add Product Form</h3>
      <label>Product Name:</label>
      <br />
      <input
        type="text"
        value={name}
        placeholder="Add in product name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Product Price:</label>
      <br />
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <button onClick={submit}>Add Product</button>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      {isAuthenticated && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
