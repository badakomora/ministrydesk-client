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
  const [pageContent, setPageContent] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar
        setActiveTab={setActiveTab}
        setIsModalOpen={setIsModalOpen}
        setPageContent={setPageContent}
        pageContent={pageContent}
        isModalOpen={isModalOpen}
        setLoading={setLoading}
        loading={loading}
        itemId={itemId}
      />
      {activeTab === "NewsItem" ||
      activeTab === "SermonsItem" ||
      activeTab === "AssemblyProgramsItem" ? (
        <Item
          itemId={itemId}
          setItemId={setItemId}
          setIsModalOpen={setIsModalOpen}
          setPageContent={setPageContent}
        />
      ) : activeTab === "NewsList" ||
        activeTab === "SermonsList" ||
        activeTab === "AssemblyProgramsList" ? (
        <List
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setItemId={setItemId}
        />
      ) : activeTab === "Dashboard" ? (
        <Dashboard
          setActiveTab={setActiveTab}
          setPageContent={setPageContent}
        />
      ) : activeTab === "Form" ? (
        <Form />
      ) : (
        <Home
          setActiveTab={setActiveTab}
          setIsModalOpen={setIsModalOpen}
          setPageContent={setPageContent}
        />
      )}
      <ToastContainer position="top-right" />
      <Footer />
    </div>
  );
}

export default App;
