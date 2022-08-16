import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { GameType } from "./app/store";
import { CustomGame } from "./layout/customGame/CustomGame";
import { Game } from "./layout/game/Game";
import { Layout } from "./layout/layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="easy" />} />
          <Route path="easy" element={<Game type={GameType.easy} />} />
          <Route path="medium" element={<Game type={GameType.medium} />} />
          <Route path="hard" element={<Game type={GameType.hard} />} />
          <Route path="custom" element={<CustomGame />} />
        </Route>
        <Route path="*" element={<Navigate to="easy" />} />
      </Routes>
    </div>
  );
}

export default App;
