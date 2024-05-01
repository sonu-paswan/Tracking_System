import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Branches from "./components/Branches";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/branches" element={<Branches />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
