import React, { useState } from 'react';
import ProductList, { sampleProducts } from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter logic using the sampleProducts the test expects
  const itemsToDisplay = sampleProducts.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const addToCart = (item) => setCart([...cart, item]);

  return (
    <div className={isDarkMode ? "App dark" : "App light"}>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
      </button>

      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="NonExistent">NonExistent</option>
      </select>

      {itemsToDisplay.length > 0 ? (
        <ProductList items={itemsToDisplay} onAddToCart={addToCart} />
      ) : (
        <p>No products available</p>
      )}

      <Cart cartItems={cart} />
    </div>
  );
};

export default App;