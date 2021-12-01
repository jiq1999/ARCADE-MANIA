import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/Landing';
import HomePage from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
