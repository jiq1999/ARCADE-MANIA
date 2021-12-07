import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/Landing/Landing';
import HomePage from './components/Home/Home';
import GameCreator from './components/CreateGame/CreateGame';
import GameDetail from './components/GameDetail/GameDetail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route path="/details/:id" element={<GameDetail />} />
          <Route exact path="/videogame" element={<GameCreator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
