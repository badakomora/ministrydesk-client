import { Home } from "./Components/Home";

import { useState } from "react";
import Item from "./Components/Item";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { List } from "./Components/List";
import Dashboard from "./Components/Dashboard";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <div className="App">
      <Navbar setActiveTab={setActiveTab} />
      {activeTab === "NewsItem" ||
      activeTab === "SermonsItem" ||
      activeTab === "AssemblyProgramsItem" ? (
        <Item activeTab={activeTab} />
      ) : activeTab === "NewsList" ||
        activeTab === "SermonsList" ||
        activeTab === "AssemblyProgramsList" ? (
        (<List activeTab={activeTab} setActiveTab={setActiveTab} />) 
      ) :activeTab === "Dashboard" ? (<Dashboard />) : (
        <Home setActiveTab={setActiveTab} />
      )}
      <Footer />
    </div>
  );
}

export default App;
