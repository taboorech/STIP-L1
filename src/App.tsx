import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lab2 from "./pages/lab2/lab2";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:lab" element={<Home/>} />
      <Route path="/lab2-1" element={<Lab2/>} />
    </Routes>
  )
}

export default App