import { Home } from "./Components/Home";

import { useState } from "react";
import Item from "./Components/Item";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { List } from "./Components/List";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <div className="App">
      <Navbar />
      {activeTab === "Item" ? (
        <Item />
      ) : activeTab === "List" ? (
        <List />
      ) : (
        <Home setActiveTab={setActiveTab} />
      )}
      <Footer />
    </div>
  );
}

export default App;
