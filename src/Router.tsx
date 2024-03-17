import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Bets from "./pages/Bets/Bets";
import Raffle from "./pages/Raffle/Raffle";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bets" element={<Bets />} />
        <Route path="/raffle" element={<Raffle />} />
      </Routes>
    </BrowserRouter>
  );
}
