import { Home } from "./Components/Home";

import { useState } from "react";
import Item from "./Components/Item";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <div className="App">
      <Navbar />
      {activeTab === "Item" ? <Item /> : <Home setActiveTab={setActiveTab} />}
      <Footer />
    </div>
  );
}

export default App;
