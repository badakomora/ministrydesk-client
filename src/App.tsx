import { useState } from "react";

import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { Item } from "./Components/Item";
import { List } from "./Components/List";
import { Dashboard } from "./Components/Dashboard";
import { Footer } from "./Components/Footer";
import { Form } from "./Components/Form";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="App">
      <Navbar
        setActiveTab={setActiveTab}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      {activeTab === "NewsItem" ||
      activeTab === "SermonsItem" ||
      activeTab === "AssemblyProgramsItem" ? (
        <Item activeTab={activeTab} />
      ) : activeTab === "NewsList" ||
        activeTab === "SermonsList" ||
        activeTab === "AssemblyProgramsList" ? (
        <List activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : activeTab === "Dashboard" ? (
        <Dashboard setActiveTab={setActiveTab} />
      ) : activeTab === "UserForm" || activeTab === "NewsForm" || activeTab === "AssemblyForm" ? (
        <Form  />
      )  : (
        <Home setActiveTab={setActiveTab} setIsModalOpen={setIsModalOpen} />
      )}
      <Footer />
    </div>
  );
}

export default App;
