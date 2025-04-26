import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lab2 from "./pages/lab2/lab2";
import Lab1 from "./pages/lab1/lab1";
import Lab3 from "./pages/lab3/lab3";
import Lab4 from "./pages/lab4/lab4";
import Lab5 from "./pages/lab5/lab5";
import Lab6 from "./pages/lab6/lab6";
import Lab7 from "./pages/lab7/lab7";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:lab" element={<Home/>} />
      <Route path="/lab2-1" element={<Lab1/>} />
      <Route path="/lab2-2" element={<Lab2/>} />
      <Route path="/lab2-3" element={<Lab3/>} />
      <Route path="/lab2-4" element={<Lab4/>} />
      <Route path="/lab2-5" element={<Lab5/>} />
      <Route path="/lab2-6" element={<Lab6/>} />
      <Route path="/lab2-7" element={<Lab7/>} />
    </Routes>
  )
}

export default App