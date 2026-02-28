import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import "./App.css";
import Details from "./pages/Details";
import NotFound from "./pages/NotFOund";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App;