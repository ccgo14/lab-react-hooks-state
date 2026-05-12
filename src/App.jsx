import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  // 1. STATE
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. FETCH (Moringa Mod 3 Standard)
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(err => console.error("Forge Data Error:", err));
  }, []);

  // 3. DERIVED STATE (Filtering logic)
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // 4. HANDLERS
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className={isDarkMode ? "App dark" : "App light"}>
      <header>
        <h1>🛒 The Forge: Shopping App</h1>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Inline Category Filter to resolve the missing file error */}
      <section className="filter-section">
        <label htmlFor="category-filter">Filter by Category: </label>
        <select 
          id="category-filter" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </section>

      <main>
        <ProductList items={itemsToDisplay} onAddToCart={addToCart} />
        <Cart cartItems={cart} />
      </main>
    </div>
  );
};

export default App;