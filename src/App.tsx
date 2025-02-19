import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lab2 from "./pages/lab2/lab2";
import Lab1 from "./pages/lab1/lab1";
import Lab3 from "./pages/lab3/lab3";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:lab" element={<Home/>} />
      <Route path="/lab2-1" element={<Lab1/>} />
      <Route path="/lab2-2" element={<Lab2/>} />
      <Route path="/lab2-3" element={<Lab3/>} />
    </Routes>
  )
}

export default App