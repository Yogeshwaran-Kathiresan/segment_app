import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SliderForm from "./components/SliderForm";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="App">
      <Header />
      <Hero onSaveSegmentClick={handleOpenModal} />
      <SliderForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
