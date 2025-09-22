import { Home } from "./Components/Home";

import { useState } from "react";
import Item from "./Components/Item";
import { Navbar } from "./Components/Navbar";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <div className="App">
      <Navbar />
      {activeTab === "Item" ? <Item /> : <Home setActiveTab={setActiveTab} />}
    </div>
  );
}

export default App;
