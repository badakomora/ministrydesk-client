import { useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { Item } from "./Components/Item";
import { List } from "./Components/List";
import { Dashboard } from "./Components/Dashboard";
import { Footer } from "./Components/Footer";
import { Form } from "./Components/Form";
import { ToastContainer } from "react-toastify";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [itemId, setItemId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar
        setActiveTab={setActiveTab}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setLoading={setLoading}
        loading={loading}
      />
      {activeTab === "NewsItem" ||
      activeTab === "SermonsItem" ||
      activeTab === "AssemblyProgramsItem" ? (
        <Item  itemId={itemId} />
      ) : activeTab === "NewsList" ||
        activeTab === "SermonsList" ||
        activeTab === "AssemblyProgramsList" ? (
        <List activeTab={activeTab} setActiveTab={setActiveTab} setItemId={setItemId} />
      ) : activeTab === "Dashboard" ? (
        <Dashboard setActiveTab={setActiveTab} />
      ) : activeTab === "UserForm" ? (
        <Form />
      ) : (
        <Home setActiveTab={setActiveTab} setIsModalOpen={setIsModalOpen} />
      )}
      <ToastContainer position="top-right" />
      <Footer />
    </div>
  );
}

export default App;
