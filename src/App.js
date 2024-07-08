import React, {useState} from "react";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import AddProduct from "./components/AddProduct/AddProduct";

import initialProducts from "./data/products.json";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(initialProducts);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const openAddProduct = () => setShowAddProduct(true);
  const closeAddProduct = () => setShowAddProduct(false);

  const handleAddToCart = (productId, productName, productImage) => {
    const produnctInCartIndex = cartItems.findIndex(
      items => items.id === productId
    );

    if(produnctInCartIndex === -1){
    const cartItems = {
      id: productId,
        name: productName,
        image: productImage,
        quantity: 1,
    };

    setCartItems( (state) => [...state, cartItems]);
  } else {
    const updatedCartItems = [...cartItems];
    updatedCartItems[produnctInCartIndex].quantity += 1;
    setCartItems(updatedCartItems);
  }
  };

  const handleIncreaseQuantity = (productId) => {
    const produnctInCartIndex = cartItems.findIndex(
      items => items.id === productId
    );

    const updatedCartItems = [...cartItems];
    updatedCartItems[produnctInCartIndex].quantity += 1;
    setCartItems(updatedCartItems);
  };
  const handleDecreaseQuantity = (productId) => {
    const produnctInCartIndex = cartItems.findIndex(
      items => items.id === productId
    );
    const qty = cartItems[produnctInCartIndex].quantity;
    let updatedCartItems = [...cartItems];
    if(qty ===1){
      updatedCartItems = updatedCartItems.filter(
        (item, index) => index !== productId
      );
    } else {
      updatedCartItems[produnctInCartIndex].quantity -= 1;
    }
    setCartItems(updatedCartItems);
  };

  const handleAddProduct = (productName) => {
    //console.log(productName);
    const product = {
      id: products.length+1,
      name: productName,
      image: "default_img.webp",
    }
    setProducts( (state) => [...state, product]);
    closeAddProduct();
  };

  return (
    //here, we can use 'div' or 'React.Fragment' or can leave tag empty
    <div>
     <Header 
     openCart = {openCart} 
     openAddProduct={openAddProduct} 
     />
     <Products 
     products={products}
     onAddToCart = {handleAddToCart}
     />
     <Cart 
     showCart={showCart} 
     closeCart={closeCart} 
     cartItems={cartItems} 
     onIncQuantity={handleIncreaseQuantity} 
     onDecQuantity={handleDecreaseQuantity}
     />
     <AddProduct
      showAddProduct={showAddProduct}
      onCloseAddProduct={closeAddProduct}
      onAddProduct = {handleAddProduct}
     />
    </div>
  );
}

export default App;
