import Product from './components/Product';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from './components/success';
import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
