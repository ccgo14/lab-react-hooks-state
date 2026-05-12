import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';

const App = () => {
  // 1. STATE MANAGEMENT
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. DATA FETCHING (The Forge Standard: Localhost:3000)
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // 3. DERIVED STATE (No redundant states for filtering)
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // 4. HANDLERS
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addToCart = (item) => {
    // Ensuring we don't add duplicates if logic requires unique items
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  return (
    <div className={isDarkMode ? "App dark" : "App light"}>
      <header>
        <h1>🛒 The Forge: Shopping App</h1>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />

      <main>
        <ProductList 
          items={itemsToDisplay} 
          onAddToCart={addToCart} 
        />
        <Cart cartItems={cart} />
      </main>
    </div>
  );
};

export default App;