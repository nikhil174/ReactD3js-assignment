import "./App.scss";
import ChartPage from "./pages/ChartPage/ChartPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </div>
  );
}

export default App;
